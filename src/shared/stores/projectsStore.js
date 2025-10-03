import { create } from 'zustand'

export const PROJECT_STATUSES = [
  'Pre-producción',
  'Grabación',
  'Edición',
  'Mezcla',
  'Mastering',
  'Entrega',
  'Archivado',
]

let nextId = 3

export const useProjectsStore = create((set, get) => ({
  projects: [
    { id: 1, name: 'Single Juan Pérez', client: 'Juan Pérez', status: 'Grabación', startDate: '2025-10-01' },
    { id: 2, name: 'Podcast María - Ep.1', client: 'María López', status: 'Edición', startDate: '2025-10-02' },
  ],

  list: () => get().projects,

  getById: (id) => get().projects.find(p => p.id === Number(id)),

  add: (data) => set(s => ({ projects: [...s.projects, { id: nextId++, status: 'Pre-producción', ...data }] })),

  update: (id, data) => set(s => ({ projects: s.projects.map(p => p.id === id ? { ...p, ...data } : p) })),

  remove: (id) => set(s => ({ projects: s.projects.filter(p => p.id !== id) })),

  moveStatus: (id, status) => set(s => ({
    projects: s.projects.map(p => p.id === id ? { ...p, status } : p)
  })),
}))
