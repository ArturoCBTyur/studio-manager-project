import { useEffect, useState } from 'react'
import Modal from '../../../shared/ui/Modal'
import { PROJECT_STATUSES } from '../../../shared/stores/projectsStore'

export default function ProjectFormModal({ open, onClose, initial, onSubmit }) {
  const [form, setForm] = useState({ name:'', client:'', status:'Pre-producción', startDate:'' })

  useEffect(() => {
    if (initial) setForm({
      name: initial.name || '',
      client: initial.client || '',
      status: initial.status || 'Pre-producción',
      startDate: initial.startDate || '',
    })
    else setForm({ name:'', client:'', status:'Pre-producción', startDate:'' })
  }, [initial, open])

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return alert('Nombre del proyecto es obligatorio')
    onSubmit(form)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Editar proyecto' : 'Nuevo proyecto'}>
      <form onSubmit={submit} style={{ display:'grid', gap:12 }}>
        <label style={lab}><span>Nombre</span>
          <input style={inp} value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} placeholder="Ej. Single X" />
        </label>
        <label style={lab}><span>Cliente</span>
          <input style={inp} value={form.client} onChange={e=>setForm(f=>({...f, client:e.target.value}))} placeholder="Nombre del cliente" />
        </label>
        <label style={lab}><span>Estado</span>
          <select style={inp} value={form.status} onChange={e=>setForm(f=>({...f, status:e.target.value}))}>
            {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label style={lab}><span>Fecha de inicio</span>
          <input type="date" style={inp} value={form.startDate} onChange={e=>setForm(f=>({...f, startDate:e.target.value}))} />
        </label>
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8 }}>
          <button type="button" onClick={onClose} style={btnSec}>Cancelar</button>
          <button type="submit" style={btnPri}>{initial ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  )
}
const lab = { display:'grid', gap:6 }
const inp = { padding:'10px 12px', border:'1px solid #ddd', borderRadius:8 }
const btnPri = { padding:'10px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }
const btnSec = { padding:'10px 14px', background:'#e5e7eb', border:'none', borderRadius:8 }
