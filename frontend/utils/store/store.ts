import { create } from 'zustand'
import { createProfileSlice } from './profileSlice'
import { createWebSocketSlice } from './websocketSlice'
import { createGPTSlice } from './gptSlice'
import { ProfileSlice } from '../../models/profileModels'
import { WebSocketSlice } from '../../models/webSocketModel'
import { GPTSlice } from '../../models/gptModels'

const useStore = create<ProfileSlice & WebSocketSlice & GPTSlice>()((...a) => ({
    ...createProfileSlice(...a),
    ...createWebSocketSlice(...a),
    ...createGPTSlice(...a)
}))

export default useStore
