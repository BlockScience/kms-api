import { withAuthenticationRequired } from '@auth0/auth0-react'
import PageLoading from '@/components/PageLoading'
import { VNode } from 'preact'

export const AuthenticationGuard = ({ children }: { children: VNode | VNode[] }) => {
  console.log('AuthenticationGuard', children)

  const Component = withAuthenticationRequired(children, {
    onRedirecting: () => <p>foop</p>,
  })

  return <Component />
}
