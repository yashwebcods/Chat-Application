import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('chat-them') || 'light',
    setTheme: (theme) => {
        localStorage.setItem('chat-them', theme)
        set({ theme })
    }

}))