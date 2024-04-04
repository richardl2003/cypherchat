import { create } from 'zustand'
import { createProfileSlice } from './profileSlice'
import { ProfileSlice } from '../../models/profileModels'

const useStore = create<ProfileSlice>()((...a) => ({
    ...createProfileSlice(...a)
}))

export default useStore
