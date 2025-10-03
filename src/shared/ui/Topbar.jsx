import { useAuthStore } from '../stores/authStore'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { logout } = useAuthStore()
  const nav = useNavigate()
  return (
    <header style={{height:56, background:'#fff', borderBottom:'1px solid #e5e7eb',
      display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px'}}>
      <div>🟦 Porto-style</div>
      <button onClick={()=>{ logout(); nav('/login') }}>Salir</button>
    </header>
  )
}
