import { StateCreator } from 'zustand'
import { kdc } from '../../utils'
import { ACCESS_TOKEN } from '../../constants'
import { WebSocketSlice } from '../../models/webSocketModel'

const ADDRESS = process.env.EXPO_PUBLIC_API_URL

export const createWebSocketSlice: StateCreator<WebSocketSlice> = (set, get) => ({
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
        socket.onmessage = () => {
            console.log('socket message')
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
            socket.send(JSON.stringify({
                source: 'search',
                query: query
            }))
        } else {
            set((state) => ({searchList: state.searchList = null}))
        }
    }
})