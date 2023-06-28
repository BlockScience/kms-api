import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PageLoading } from '@/components/PageLoading'

interface AuthRequiredProps {
  component
}
export const AuthRequired = ({ component }: AuthRequiredProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: PageLoading,
  })
  return <Component />
}
