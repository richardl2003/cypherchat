import { StateCreator } from 'zustand'
import { kdc } from '../../utils'
import { ACCESS_TOKEN } from '../../constants'
import { WebSocketSlice } from '../../models/webSocketModel'

const ADDRESS = process.env.EXPO_PUBLIC_API_URL

export const createWebSocketSlice: StateCreator<WebSocketSlice> = (set, get) => {
    const handlers: { [key: string]: (data: any) => void } = {
        'search': (data) => set((state) => ({searchList: state.searchList = data})),
        'request_connect': (data) => {
            const sl = get().searchList
            if (sl && !sl.includes(data.sender)) {
                const index = sl.findIndex((user) => user.username === data.receiver.username)
                if (index !== -1) {
                    sl[index].status = 'pending-other'
                    set((state) => ({searchList: state.searchList = [...sl]}))
                }
            } else {
                const rl = get().requestList
                if (rl) {
                    const index = rl.findIndex((user) => user.sender.username === data.sender.username)
                    if (index === -1) {
                        rl.unshift(data)
                        set((state) => ({requestList: state.requestList = [...rl]}))
                    }
                }
            }
        },
        'request_list': (data) => set((state) => ({ requestList: state.requestList = [...data]})),
        'request_accept': (data) => {
            const rl = get().requestList
            if (rl && !rl.includes(data.receiver)) {
                const reqIndex = rl.findIndex((user) => user.id === data.id)
                if (reqIndex !== -1) {
                    rl.splice(reqIndex, 1)
                    set((state) => ({ requestList: state.requestList = [...rl]}))
                }
            } 
            const sl = get().searchList
            if (sl === null) {
                return
            }
            if (sl.includes(data.sender)) {
                const sIndex = sl.findIndex(
                    user => user.username === data.sender.username
                )
                sl[sIndex].status = 'connected'
                set((state) => ({ searchList: state.searchList = [...sl]}))
            } else {
                const sIndex = sl.findIndex(
                    (user) => user.username === data.receiver.username
                )
                sl[sIndex].status = 'connected'
                set((state) => ({ searchList: state.searchList = [...sl]}))
            }
            // Call conversation list
            const socket = get().socket
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'conversation_list'
                }))
            }
        },
        'conversation_list': (data) => set((state) => ({ conversationList: state.conversationList = [...data]})),
        'message_list': (data) => {
            const ml = get().messagesList
            if (ml) {
                set((state) => ({
                    messagesList: state.messagesList = [...ml , ...data.messages],
                    messagesNext: state.messagesNext = data.next,
                    messagesUsername: state.messagesUsername = data.recipient.username
                }))               
            }

        },
        'message_send': (data) => {
            const username = data.recipient.username
            const conversationList = get().conversationList
            if (conversationList === null){
                return
            }
            const convoList = [...conversationList]
            const convoIndex = convoList.findIndex(
                item => item.employee.username === username
            )
            if (convoIndex >= 0) {
                const item = convoList[convoIndex]
                item.preview = data.message.message
                item.updated = data.message.timestamp
                convoList.splice(convoIndex, 1)
                convoList.unshift(item)
                set((state) => ({conversationList: state.conversationList = convoList}))
            }

            if (username !== get().messagesUsername) {
                return
            }
            const messagesList = get().messagesList
            if (messagesList){
                set((state) => ({
                    messagesList: state.messagesList = [data.message, ...messagesList],
                    messagesTyping: null
                }))
            }
        },
        'message_type': (data) => {
            if (data.username !== get().messagesUsername) return
            set((state) => ({messagesTyping: state.messagesTyping = new Date()}))
        },
        // Add more handlers as needed
    };

    return {
        socket: null,
        socketConnect: async () => {
            const access = kdc.get(ACCESS_TOKEN)
            const url = `wss://${ADDRESS}/chats/?token=${access}`
            console.log(`url: ${url}`)
            const socket = new WebSocket(url)
    
            // Listening to socket events
            socket.onopen = () => {
                console.log('socket opened')
                socket.send(JSON.stringify({
                    source: 'request_list'
                }))
                socket.send(JSON.stringify({
                    source: 'conversation_list'
                }))
            }
            socket.onmessage = (event) => {
                const parsed = JSON.parse(event.data)
                console.log('socket message', JSON.stringify(parsed))
                if (handlers[parsed.source]) {
                    handlers[parsed.source](parsed.data)
                }
            }
            socket.onclose = () => {
                console.log('socket closed')
            }
            socket.onerror = (e) => {
                console.log('socket error', e)
            }
            set((state) => ({socket: state.socket = socket}))
         },
        socketClose: () => {
            const socket = get().socket
            if (socket) socket.close()
            set((state) => ({socket: state.socket = null}))
        },
        searchList: null,
        searchUsers: (query: string) => {
            if (query) {
                const socket = get().socket
                if (socket) {
                    socket.send(JSON.stringify({
                        source: 'search',
                        query: query
                    }))
                }
            } else {
                set((state) => ({searchList: state.searchList = null}))
            }
        },
        requestList: null,
        requestConnect: (username: string) => {
            const socket = get().socket
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'request_connect',
                    username: username
                }))
            } else {
                set((state) => ({requestList: state.requestList = null}))
            }
        },
        requestAccept: (username: string) => {
            const socket = get().socket
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'request_accept',
                    username: username
                }))
            }
        },
        conversationList: null,

        messagesList: [],
        messagesNext: null,
        messagesTyping: null,
        messagesUsername: null,

        messageList: (connectionId: number, page=0) => {
            const socket = get().socket
            if (page === 0) {
                set((state) => ({
                    messagesList: state.messagesList = [],
                    messagesNext: state.messagesNext = null,
                    messagesTyping: state.messagesTyping = null,
                    messagesUsername: state.messagesUsername = null
                }))
            }
            else {
                set((state) => ({
                    messagesNext: null
                }))
            }
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'message_list',
                    connectionId: connectionId,
                    page: page
                }))
            }
            else {
                set((state) => ({messagesList: state.messagesList = []}))
            }
        },

        messageSend: (connectionId: number, message: string) => {
            const socket = get().socket
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'message_send',
                    connectionId: connectionId,
                    message: message
                }))
            }
        },

        messageType: (username: string) => {
            const socket = get().socket
            if (socket) {
                socket.send(JSON.stringify({
                    source: 'message_type',
                    username: username
                }))
            }
        }

    }
}