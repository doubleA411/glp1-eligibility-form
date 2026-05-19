import { create } from 'zustand'

interface Screen {
  screen: number
  prompt: string
  type: string
  options?: string[]
}

interface FormState {
  sessionId: string | null
  currentScreen: Screen | null
  answers: Record<number, any>
  result: string | null
  setSessionId: (id: string) => void
  setCurrentScreen: (screen: Screen) => void
  setAnswer: (screen: number, value: any) => void
  setResult: (result: string) => void
  reset: () => void
}

export const useFormStore = create<FormState>((set) => ({
  sessionId: null,
  currentScreen: null,
  answers: {},
  result: null,
  setSessionId: (id) => set({ sessionId: id }),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setAnswer: (screen, value) => set((state) => ({
    answers: { ...state.answers, [screen]: value }
  })),
  setResult: (result) => set({ result }),
  reset: () => set({ sessionId: null, currentScreen: null, answers: {}, result: null }),
}))