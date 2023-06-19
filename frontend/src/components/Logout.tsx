import { useAuth0 } from '@auth0/auth0-react';
import { Button, ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <ActionIcon
      variant='default'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      size={30}
    >
      <IconLogout size='1rem' />
    </ActionIcon>
  );
};

export default LogoutButton;
