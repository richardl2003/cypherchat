import { StateCreator } from 'zustand'
import { Profile, ProfileSlice } from '../../models/profileModels'


export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
    user: null,
    setUser: (user: Profile) => set((state) => ({user: state.user = user}))
})