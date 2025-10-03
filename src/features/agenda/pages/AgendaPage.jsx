import { useMemo, useState } from 'react'
import SessionDrawer from '../components/SessionDrawer'
import { useSessionsStore } from '../../../shared/stores/sessionsStore'

// Constantes de la sala única:
const START_HOUR = 10
const END_HOUR = 21

const todayISO = () => new Date().toISOString().slice(0,10)

export default function AgendaPage() {
  const [date, setDate] = useState(todayISO())
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const { listByDate, addSession, updateSession, removeSession, sessions } = useSessionsStore()

  const daySessions = useMemo(() => listByDate(date), [date, sessions, listByDate])

  // generar slots horarios
  const slots = useMemo(() => {
    const arr = []
    for (let h = START_HOUR; h < END_HOUR; h++) {
      arr.push({ label: `${String(h).padStart(2,'0')}:00`, value: h })
    }
    return arr
  }, [])

  // validaciones
  const overlaps = (aStart, aEnd, ignoreId) => {
    const start = new Date(aStart).getTime()
    const end   = new Date(aEnd).getTime()
    return daySessions.some(s => {
      if (ignoreId && s.id === ignoreId) return false
      const s1 = new Date(s.start).getTime(), e1 = new Date(s.end).getTime()
      return Math.max(start, s1) < Math.min(end, e1) // solape
    })
  }
  const outsideHours = (aStart, aEnd) => {
    const d = date
    const min = new Date(`${d}T${String(START_HOUR).padStart(2,'0')}:00`).getTime()
    const max = new Date(`${d}T${String(END_HOUR).padStart(2,'0')}:00`).getTime()
    const st = new Date(aStart).getTime(), en = new Date(aEnd).getTime()
    return st < min || en > max
  }

  const createOrUpdate = (payload) => {
    if (outsideHours(payload.start, payload.end)) { alert('Debe estar entre 10:00 y 21:00'); return }
    if (overlaps(payload.start, payload.end, editing?.id)) { alert('Se solapa con otra sesión'); return }
    editing ? updateSession(editing.id, payload) : addSession(payload)
  }

  // para pintar bloques de sesiones en la grilla
  const positionFor = (start, end) => {
    const sH = new Date(start).getHours() + new Date(start).getMinutes()/60
    const eH = new Date(end).getHours() + new Date(end).getMinutes()/60
    const top = (sH-START_HOUR) * 56 // 56px por hora
    const height = Math.max(40, (eH - sH) * 56)
    return { top, height }
  }

  return (
    <div>
      <h2 style={{ marginBottom:12 }}>Agenda (Sala única)</h2>

      <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)}
               style={{ padding:'8px 10px', border:'1px solid #ddd', borderRadius:8 }} />
        <button style={btnPri} onClick={()=>{ setEditing(null); setOpen(true) }}>+ Nueva sesión</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:0, background:'#fff',
                    border:'1px solid #eee', borderRadius:12, overflow:'hidden', maxWidth:900 }}>
        {/* columna de horas */}
        <div style={{ borderRight:'1px solid #eee', background:'#fafafa' }}>
          {slots.map(s => (
            <div key={s.value} style={{ height:56, padding:'8px 10px', borderBottom:'1px dashed #f0f0f0', color:'#6b7280' }}>
              {s.label}
            </div>
          ))}
        </div>

        {/* columna de timeline */}
        <div style={{ position:'relative' }}>
          {slots.map(s => (
            <div key={s.value} style={{ height:56, borderBottom:'1px dashed #f0f0f0' }} />
          ))}

          {/* sesiones pintadas */}
          {daySessions.map(s => {
            const pos = positionFor(s.start, s.end)
            return (
              <div key={s.id}
                   style={{ position:'absolute', left:10, right:10, top:pos.top+6, height:pos.height-12,
                            background:'#e0ecff', border:'1px solid #bfdbfe', borderRadius:10, padding:'8px 10px' }}>
                <div style={{ fontWeight:600 }}>{s.project}</div>
                <div style={{ fontSize:12, color:'#374151' }}>
                  {fmt(s.start)} — {fmt(s.end)} · {s.owner || '—'}
                </div>
                <div style={{ marginTop:6, display:'flex', gap:8 }}>
                  <button style={btnSec} onClick={()=>{ setEditing(s); setOpen(true) }}>Editar</button>
                  <button style={btnDanger} onClick={()=>{ if(confirm('¿Eliminar sesión?')) removeSession(s.id) }}>Eliminar</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SessionDrawer
        open={open}
        onClose={()=>setOpen(false)}
        initial={editing}
        dateISO={date}
        onSubmit={createOrUpdate}
      />
    </div>
  )
}

const fmt = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
const btnPri = { padding:'10px 14px', background:'#2563eb', color:'#fff', border:'none', borderRadius:8 }
const btnSec = { padding:'8px 12px', background:'#e5e7eb', border:'none', borderRadius:8 }
const btnDanger = { padding:'8px 12px', background:'#ef4444', color:'#fff', border:'none', borderRadius:8 }
