import { create } from 'zustand'
import { createProfileSlice } from './profileSlice'
import { createWebSocketSlice } from './websocketSlice'
import { ProfileSlice } from '../../models/profileModels'
import { WebSocketSlice } from '../../models/webSocketModel'

const useStore = create<ProfileSlice & WebSocketSlice>()((...a) => ({
    ...createProfileSlice(...a),
    ...createWebSocketSlice(...a)
}))

export default useStore
