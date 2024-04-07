function formatTime(date: Date | string | null) {
    if (date === null) {
        return ''
    }
    const now = new Date()
    const current = new Date(date)
    const seconds = Math.abs(now.getTime() - current.getTime()) / 1000
    if (seconds < 60) {
        return 'Just now'
    }
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60)
        return `${minutes} mins ago`
    }
    if (seconds < 3600*24) {
        const hours = Math.floor(seconds / 3600)
        return `${hours} hours ago`
    }
    if (seconds < 3600*24*7) {
        const days = Math.floor(seconds / (3600*24))
        return `${days} days ago`
    }
    if (seconds < 3600*24*7*4) {
        const weeks = Math.floor(seconds / (3600*24*7))
        return `${weeks} weeks ago`
    }
    if (seconds < 3600*24*7*4*12) {
        const months = Math.floor(seconds / (3600*24*30))
        return `${months} months ago`
    }
    const years = Math.floor(seconds / (3600*24*365))
    return `${years} years ago`
}

export { formatTime }