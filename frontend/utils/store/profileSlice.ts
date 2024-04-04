import { StateCreator } from 'zustand'
import { Profile, ProfileSlice } from '../../models/profileModels'


export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
    user: {id: 0, username: "", first_name: "", last_name: "", email: ""},
    setUser: (user: Profile) => set((state) => ({user: state.user = user}))
})