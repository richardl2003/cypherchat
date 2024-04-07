type Users = {
    name: string,
    username: string,
    status: string
}

interface WebSocketSlice {
    socket: any
    socketConnect: () => Promise<void>
    socketClose: () => void
    searchList: Users[] | null
    searchUsers: (query: string) => void
    requestList: any[] | null
    requestConnect: (username: string) => void
    requestAccept: (username: string) => void
    conversationList: any[] | null
    messagesList: any[] | null
    messagesNext: any | null
    messagesTyping: any | null
    messagesUsername: any | null
    messageList: (connectionId: number, page: number) => void
    messageSend: (connectionId: number, message: string) => void
    messageType: (username: string) => void
}

export { WebSocketSlice }