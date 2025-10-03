import { create } from 'zustand'

export const useAuthStore = create((set,get)=>({
  user: null,
  login: (u) => set({ user: u }),
  logout: () => { localStorage.removeItem('logged'); set({ user:null }) },
  isLogged: () => !!localStorage.getItem('logged'),
}))
