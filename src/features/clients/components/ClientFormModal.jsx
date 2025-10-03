import { useEffect, useState } from 'react'
import Modal from '../../../shared/ui/Modal'

export default function ClientFormModal({ open, onClose, initial, onSubmit }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'' })

  useEffect(() => {
    if (initial) setForm({ name: initial.name || '', phone: initial.phone || '', email: initial.email || '' })
    else setForm({ name:'', phone:'', email:'' })
  }, [initial, open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name?.trim()) return alert('Nombre es obligatorio')
    onSubmit(form)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Editar cliente' : 'Nuevo cliente'}>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:12 }}>
        <label style={{ display:'grid', gap:6 }}>
          <span>Nombre</span>
          <input value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}
                 placeholder="Nombre del cliente" style={inputStyle}/>
        </label>
        <label style={{ display:'grid', gap:6 }}>
          <span>Teléfono</span>
          <input value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))}
                 placeholder="Teléfono" style={inputStyle}/>
        </label>
        <label style={{ display:'grid', gap:6 }}>
          <span>Email</span>
          <input value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))}
                 placeholder="correo@dominio.com" style={inputStyle}/>
        </label>
        <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:4 }}>
          <button type="button" onClick={onClose} style={btnSec}>Cancelar</button>
          <button type="submit" style={btnPri}>{initial ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  )
}

const inputStyle = { padding:'10px 12px', border:'1px solid #ddd', borderRadius:8 }
const btnPri = { padding:'10px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }
const btnSec = { padding:'10px 14px', background:'#e5e7eb', border:'none', borderRadius:8 }
