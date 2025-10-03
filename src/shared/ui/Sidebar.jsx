import { NavLink } from 'react-router-dom'

const Item = ({ to, label }) => (
  <NavLink
    to={to}
    style={({isActive})=>({
      display:'block', padding:'10px 14px', borderRadius:8,
      background: isActive ? '#e8eefc' : 'transparent',
      color:'#1f2937', textDecoration:'none', marginBottom:6
    })}
  >{label}</NavLink>
)

export default function Sidebar() {
  return (
    <aside style={{borderRight:'1px solid #e5e7eb', background:'#fff', padding:16}}>
      <div style={{fontWeight:700, margin:'6px 0 12px'}}>Studio Admin</div>
      <Item to="/" label="Dashboard" />
      <Item to="/agenda" label="Agenda" />
      <Item to="/proyectos" label="Proyectos" />
      <Item to="/clientes" label="Clientes" />
      <Item to="/ajustes" label="Ajustes" />
    </aside>
  )
}
