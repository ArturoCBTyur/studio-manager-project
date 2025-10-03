import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import ProtectedRoute from './ProtectedRoute'

// Pages
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import AgendaPage from '../features/agenda/pages/AgendaPage'
import ProjectsPage from '../features/projects/pages/ProjectsPage'
import ProjectDetailPage from '../features/projects/pages/ProjectDetailPage'
import ClientsPage from '../features/clients/pages/ClientsPage'
import ClientDetailPage from '../features/clients/pages/ClientDetailPage'
import SettingsPage from '../features/settings/pages/SettingsPage'

// Login temporal (simple)
const LoginPage = () => <div style={{padding:24}}>
  <h2>Login</h2>
  <p>(Temporal) Click para simular login.</p>
 <button
  onClick={() => {
    localStorage.setItem('logged', '1');   // marca sesión
    window.location.href = '/';            // entra al layout
  }}
>
  Entrar
</button>

</div>

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'agenda', element: <AgendaPage /> },
      { path: 'proyectos', element: <ProjectsPage /> },
      { path: 'proyectos/:id', element: <ProjectDetailPage /> },
      { path: 'clientes', element: <ClientsPage /> },
      { path: 'clientes/:id', element: <ClientDetailPage /> },
      { path: 'ajustes', element: <SettingsPage /> },
    ]
  },
  { path: '*', element: <div style={{padding:24}}>No encontrado</div> }
])
