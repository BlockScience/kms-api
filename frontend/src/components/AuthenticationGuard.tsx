import { withAuthenticationRequired } from '@auth0/auth0-react'
import PageLoading from '@/components/PageLoading'

export const AuthenticationGuard = (component: React.ComponentType<object>) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className='page-layout'>
        <PageLoading />
      </div>
    ),
  })

  return <Component />
}
