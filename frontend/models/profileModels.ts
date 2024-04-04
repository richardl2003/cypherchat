type Profile = {
    id: number
    username: string
    first_name: string
    last_name: string
    email: string
}

interface ProfileSlice {
    user: Profile
    setUser: (profile: Profile) => void
}

export { Profile, ProfileSlice }