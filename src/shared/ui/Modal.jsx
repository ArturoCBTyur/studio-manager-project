export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.35)',
      display:'grid', placeItems:'center', zIndex:50
    }}>
      <div style={{ background:'#fff', width:420, maxWidth:'90vw', borderRadius:12, overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,.2)' }}>
        <div style={{ padding:'14px 16px', borderBottom:'1px solid #eee', fontWeight:600 }}>{title}</div>
        <div style={{ padding:16 }}>{children}</div>
        <div style={{ padding:12, borderTop:'1px solid #eee', display:'flex', gap:8, justifyContent:'flex-end' }}>
          {footer ?? <button onClick={onClose}>Cerrar</button>}
        </div>
      </div>
    </div>
  )
}
