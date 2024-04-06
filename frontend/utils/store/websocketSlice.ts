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
        },
        'conversation_list': (data) => set((state) => ({ conversationList: state.conversationList = [...data]})),
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

    }
}