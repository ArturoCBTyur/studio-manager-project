import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClientFormModal from '../components/ClientFormModal'
import { useClientsStore } from '../../../shared/stores/clientsStore'

export default function ClientsPage() {
  const { clients, addClient, updateClient, removeClient } = useClientsStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [q, setQ] = useState('')

  const filtered = clients.filter(c =>
    [c.name, c.phone, c.email].some(v => (v || '').toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div>
      <h2 style={{ marginBottom:12 }}>Clientes</h2>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)}
               style={{ padding:'10px 12px', border:'1px solid #ddd', borderRadius:8, minWidth:260 }}/>
        <button onClick={()=>{ setEditing(null); setOpen(true) }} style={btnPri}>+ Nuevo</button>
      </div>

      <div style={{ overflow:'auto', border:'1px solid #eee', borderRadius:12 }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ background:'#fafafa' }}>
            <tr>
              <Th>Nombre</Th><Th>Teléfono</Th><Th>Email</Th><Th style={{width:170}}>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderTop:'1px solid #f0f0f0' }}>
                <Td><Link to={`/clientes/${c.id}`}>{c.name}</Link></Td>
                <Td>{c.phone || '—'}</Td>
                <Td>{c.email || '—'}</Td>
                <Td>
                  <button style={btnSec} onClick={()=>{ setEditing(c); setOpen(true) }}>Editar</button>{' '}
                  <button style={btnDanger} onClick={()=>{ if(confirm('¿Eliminar cliente?')) removeClient(c.id) }}>Eliminar</button>
                </Td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} style={{ padding:16, textAlign:'center', color:'#6b7280' }}>
                Sin clientes. Crea el primero.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ClientFormModal
        open={open}
        initial={editing}
        onClose={()=>setOpen(false)}
        onSubmit={(data)=> editing ? updateClient(editing.id, data) : addClient(data)}
      />
    </div>
  )
}

const Th = ({ children, ...p }) => <th {...p} style={{ textAlign:'left', padding:12, fontWeight:600 }} >{children}</th>
const Td = ({ children, ...p }) => <td {...p} style={{ padding:12 }}>{children}</td>
const btnPri = { padding:'10px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }
const btnSec = { padding:'8px 12px', background:'#e5e7eb', border:'none', borderRadius:8 }
const btnDanger = { padding:'8px 12px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8 }
