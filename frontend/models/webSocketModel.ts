interface WebSocketSlice {
    socket: any
    socketConnect: () => Promise<void>
    socketClose: () => void
}

export { WebSocketSlice }