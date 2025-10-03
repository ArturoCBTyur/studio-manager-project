import { useParams, Link } from 'react-router-dom'
import { useClientsStore } from '../../../shared/stores/clientsStore'

export default function ClientDetailPage() {
  const { id } = useParams()
  const client = useClientsStore(s => s.getById(id))

  if (!client) {
    return <div>
      <p>Cliente no encontrado.</p>
      <Link to="/clientes">Volver</Link>
    </div>
  }

  return (
    <div>
      <Link to="/clientes">← Volver</Link>
      <h2 style={{ margin:'8px 0 12px' }}>{client.name}</h2>
      <div style={{ display:'grid', gap:8, maxWidth:520 }}>
        <Row label="Teléfono" value={client.phone || '—'} />
        <Row label="Email" value={client.email || '—'} />
      </div>

      <h3 style={{ marginTop:24 }}>Proyectos del cliente</h3>
      <p>(Más adelante aquí listaremos proyectos vinculados y sesiones.)</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'160px 1fr', alignItems:'center' }}>
      <div style={{ color:'#6b7280' }}>{label}</div>
      <div>{value}</div>
    </div>
  )
}

