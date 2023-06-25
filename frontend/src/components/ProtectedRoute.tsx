import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PageLoading } from '@/components/PageLoading'

interface ProtectedRouteProps {
  component: () => JSX.Element
}
export const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: PageLoading,
  })
  return <Component />
}
