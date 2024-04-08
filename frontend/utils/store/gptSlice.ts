import { StateCreator } from 'zustand'
import { GPTSlice } from '../../models/gptModels'
import { openaiUtils } from '../../utils/'


export const createGPTSlice: StateCreator<GPTSlice> = (set) => ({
    summary: null,
    getSummary: async (query: string) => {
        const response = await openaiUtils.gpt(query)
        set((state) => ({ summary: state.summary = response.message.content}))
    }
})