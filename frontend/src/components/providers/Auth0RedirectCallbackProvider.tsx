import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { auth0 } from '@/config'

export const Auth0RedirectProvider = ({ children }) => {
  const navigate = useNavigate()
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname)
  }
  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={auth0.domain}
      clientId={auth0.clientID}
      authorizationParams={{
        audience: auth0.audience,
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  )
}
