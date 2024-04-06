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
            if (sl) {
                if (!sl.includes(data.sender)) {
                    const index = sl.findIndex((user) => user.username === data.receiver.username)
                    if (index !== -1) {
                        sl[index].status = 'pending-other'
                        set((state) => ({searchList: state.searchList = [...sl]}))
                    }
                } else {
                    const rl = get().requestList
                    if (rl) {
                        const index = rl.findIndex((user) => user.username === data.sender.username)
                        if (index === -1) {
                            rl.unshift(data)
                            set((state) => ({requestList: state.requestList = [...rl]}))
                        }
                    }
                }
            }
        }
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
            }
            socket.onmessage = (event) => {
                const parsed = JSON.parse(event.data)
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
        }    
    }
}