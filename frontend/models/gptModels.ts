interface GPTSlice {
    summary: string | null
    getSummary: (query: string) => Promise<void>
}

export { GPTSlice }