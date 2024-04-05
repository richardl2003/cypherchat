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
}

export { WebSocketSlice }