export interface User {
  name: string
  email: string
}

export interface Group {
  id: number
  name: string
  members: number
  totalAmount: number
  monthlyAmount: number
  nextPayment: string
  yourTurn: boolean
}

export interface AppState {
  hasCompletedOnboarding: boolean
  user: User | null
  groups: Group[]
}

const STORAGE_KEY = "migente_app_state"

export const storage = {
  getState: (): AppState => {
    if (typeof window === "undefined") {
      return {
        hasCompletedOnboarding: false,
        user: null,
        groups: [],
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error("[v0] Error reading from localStorage:", error)
    }

    return {
      hasCompletedOnboarding: false,
      user: null,
      groups: [],
    }
  },

  setState: (state: Partial<AppState>) => {
    if (typeof window === "undefined") return

    try {
      const currentState = storage.getState()
      const newState = { ...currentState, ...state }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
    } catch (error) {
      console.error("[v0] Error writing to localStorage:", error)
    }
  },

  clearState: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  },
}
