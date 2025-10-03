import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjectsStore, PROJECT_STATUSES } from '../../../shared/stores/projectsStore'
import ProjectFormModal from '../components/ProjectFormModal'

export default function ProjectsPage() {
  const { list, add, update, remove } = useProjectsStore()
  const projects = list()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [status, setStatus] = useState('')

  const filtered = projects.filter(p => {
    const text = (p.name + ' ' + (p.client || '')).toLowerCase()
    const okText = text.includes(q.toLowerCase())
    const okStatus = !status || p.status === status
    return okText && okStatus
  })

  return (
    <div>
      <h2 style={{ marginBottom:12 }}>Proyectos</h2>

      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)}
               style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, minWidth:240 }} />
        <select value={status} onChange={e=>setStatus(e.target.value)}
                style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8 }}>
          <option value="">Todos</option>
          {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={()=>{ setEditing(null); setOpen(true) }} style={btnPri}>+ Nuevo</button>
      </div>

      <div style={{ overflow:'auto', border:'1px solid #eee', borderRadius:12 }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ background:'#fafafa' }}>
            <tr><Th>Proyecto</Th><Th>Cliente</Th><Th>Estado</Th><Th>Inicio</Th><Th style={{width:180}}>Acciones</Th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderTop:'1px solid #f0f0f0' }}>
                <Td><Link to={`/proyectos/${p.id}`}>{p.name}</Link></Td>
                <Td>{p.client || '—'}</Td>
                <Td><span style={pill}>{p.status}</span></Td>
                <Td>{p.startDate || '—'}</Td>
                <Td>
                  <button style={btnSec} onClick={()=>{ setEditing(p); setOpen(true) }}>Editar</button>{' '}
                  <button style={btnDanger} onClick={()=>{ if(confirm('¿Eliminar proyecto?')) remove(p.id) }}>Eliminar</button>
                </Td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ padding:16, textAlign:'center', color:'#6b7280' }}>Sin proyectos.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ProjectFormModal
        open={open}
        initial={editing}
        onClose={()=>setOpen(false)}
        onSubmit={(data)=> editing ? update(editing.id, data) : add(data)}
      />
    </div>
  )
}

const Th = ({ children }) => <th style={{ textAlign:'left', padding:12, fontWeight:600 }}>{children}</th>
const Td = ({ children }) => <td style={{ padding:12 }}>{children}</td>
const pill = { background:'#eef2ff', border:'1px solid #e0e7ff', color:'#3730a3', padding:'4px 8px', borderRadius:999 }
const btnPri = { padding:'10px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }
const btnSec = { padding:'8px 12px', background:'#e5e7eb', border:'none', borderRadius:8 }
const btnDanger = { padding:'8px 12px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8 }

