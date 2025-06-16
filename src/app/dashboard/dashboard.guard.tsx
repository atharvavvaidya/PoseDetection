import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../_store/auth/auth.store'
import { AuthRouterType } from '../auth/_types/router.type'

export const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const store = useAuthStore()

  useEffect(() => {
    if (!store.isLoggedIn()) {
      navigate(AuthRouterType.ROOT)
    }
  }, [store.isLoggedIn(), navigate])

  return <>{store.isLoggedIn() ? children : null}</>
}
