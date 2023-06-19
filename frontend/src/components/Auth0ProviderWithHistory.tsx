import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { PropsWithChildren } from 'react';

interface AuthProps {
  domain;
  clientId;
}
const Auth0ProviderWithHistory = ({
  children,
  domain,
  clientId,
}: PropsWithChildren<AuthProps>) => {
  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
