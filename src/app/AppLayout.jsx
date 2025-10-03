import { Outlet } from 'react-router-dom'
import Sidebar from '../shared/ui/Sidebar'
import Topbar from '../shared/ui/Topbar'

export default function AppLayout() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'260px 1fr', minHeight:'100vh'}}>
      <Sidebar />
      <div style={{display:'flex', flexDirection:'column'}}>
        <Topbar />
        <main style={{padding:'20px 24px', background:'#f6f7fb', flex:1}}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
