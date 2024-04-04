import { create } from 'zustand'
import { createProfileSlice } from './profileSlice'
import { ProfileSlice } from '../models/profileModels'

export const useStore = create<ProfileSlice>()((...a) => ({
    ...createProfileSlice(...a)
}))