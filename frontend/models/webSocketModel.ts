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
}

export { WebSocketSlice }