import { useEffect, useState } from 'react'
import Modal from '../../../shared/ui/Modal'
import { useProjectsStore } from '../../../shared/stores/projectsStore'

const toLocal = (d) => new Date(d).toISOString().slice(0,16)

export default function SessionDrawer({ open, onClose, initial, onSubmit, dateISO }) {
  const projects = useProjectsStore(s => s.projects)
  const defaultStart = dateISO ? `${dateISO}T10:00` : new Date().toISOString().slice(0,16)
  const defaultEnd   = dateISO ? `${dateISO}T11:00` : new Date(Date.now()+60*60*1000).toISOString().slice(0,16)

  const [form, setForm] = useState({ projectId:'', owner:'', start:defaultStart, end:defaultEnd })

  useEffect(() => {
    if (initial) {
      setForm({
        projectId: initial.projectId ? String(initial.projectId) : '',
        owner: initial.owner || '',
        start: toLocal(initial.start),
        end: toLocal(initial.end),
      })
    } else {
      setForm({ projectId:'', owner:'', start: defaultStart, end: defaultEnd })
    }
    // eslint-disable-next-line
  }, [initial, open, dateISO])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.projectId) return alert('Selecciona un proyecto')
    if (new Date(form.end) <= new Date(form.start)) return alert('Fin debe ser mayor que inicio')
    onSubmit({
      projectId: Number(form.projectId),
      owner: form.owner,
      start: new Date(form.start).toISOString(),
      end: new Date(form.end).toISOString(),
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Editar sesión' : 'Nueva sesión'}>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:12 }}>
        <label style={lab}><span>Proyecto</span>
          <select style={inp} value={form.projectId} onChange={e=>setForm(f=>({...f, projectId:e.target.value}))}>
            <option value="">— Selecciona —</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <label style={lab}><span>Responsable</span>
          <input style={inp} value={form.owner} onChange={e=>setForm(f=>({...f, owner:e.target.value}))} placeholder="Productor/Ingeniero" />
        </label>
        <label style={lab}><span>Inicio</span>
          <input type="datetime-local" style={inp} value={form.start} onChange={e=>setForm(f=>({...f, start:e.target.value}))}/>
        </label>
        <label style={lab}><span>Fin</span>
          <input type="datetime-local" style={inp} value={form.end} onChange={e=>setForm(f=>({...f, end:e.target.value}))}/>
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
