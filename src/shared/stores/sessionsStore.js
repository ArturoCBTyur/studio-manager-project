import { create } from 'zustand'

let nextId = 3

export const useSessionsStore = create((set, get) => ({
  // sesiones iniciales de ejemplo
  sessions: [
    // { id:1, project:'Álbum JP', start:'2025-10-02T12:00:00', end:'2025-10-02T14:00:00', owner:'Productor' }
  ],

  addSession: (data) => set((s) => ({
    sessions: [...s.sessions, { id: nextId++, ...data }]
  })),

  updateSession: (id, data) => set((s) => ({
    sessions: s.sessions.map(x => x.id === id ? { ...x, ...data } : x)
  })),

  removeSession: (id) => set((s) => ({
    sessions: s.sessions.filter(x => x.id !== id)
  })),

  listByDate: (isoDate) => {
    const day = isoDate.slice(0,10)
    return get().sessions.filter(s => s.start.slice(0,10) === day)
  },
}))
