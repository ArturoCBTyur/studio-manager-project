import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../shared/stores/authStore'

export default function ProtectedRoute({ children }) {
  const { isLogged } = useAuthStore()
  const loc = useLocation()
  if (!isLogged()) return <Navigate to="/login" replace state={{ from: loc }} />
  return children
}
