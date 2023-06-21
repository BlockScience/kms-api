import { withAuthenticationRequired } from '@auth0/auth0-react'
import PageLoader from '@/components/PageLoader'

export const AuthenticationGuard = (component: React.ComponentType<object>) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className='page-layout'>
        <PageLoader />
      </div>
    ),
  })

  return <Component />
}
