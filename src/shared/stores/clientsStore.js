import { create } from 'zustand'

let nextId = 3

export const useClientsStore = create((set, get) => ({
  clients: [
    { id: 1, name: 'Juan Pérez', phone: '999-111-222', email: 'juan@example.com' },
    { id: 2, name: 'María López', phone: '988-777-666', email: 'maria@example.com' },
  ],

  addClient: (data) => set((s) => ({
    clients: [...s.clients, { id: nextId++, ...data }]
  })),

  updateClient: (id, data) => set((s) => ({
    clients: s.clients.map(c => c.id === id ? { ...c, ...data } : c)
  })),

  removeClient: (id) => set((s) => ({
    clients: s.clients.filter(c => c.id !== id)
  })),

  getById: (id) => get().clients.find(c => c.id === Number(id)),
}))
