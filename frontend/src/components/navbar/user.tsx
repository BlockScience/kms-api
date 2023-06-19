import { IconSettings } from '@tabler/icons-react';
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  rem,
  Skeleton,
  Center,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '@/components/navbar/Login';
import { PropsWithChildren } from 'react';
import Logout from '@/components/navbar/Logout';

function Boxy(props: PropsWithChildren<{ theme }>) {
  return (
    <Box
      sx={{
        paddingTop: props.theme.spacing.xs,
        borderTop: `${rem(1)} solid ${
          props.theme.colorScheme === 'dark'
            ? props.theme.colors.dark[4]
            : props.theme.colors.gray[2]
        }`,
      }}
    >
      {props.children}
    </Box>
  );
}

export function User() {
  const theme = useMantineTheme();
  const { user, isAuthenticated, isLoading } = useAuth0();
  return isLoading ? (
    <Boxy theme={theme}>
      <Group align='center'>
        <Skeleton height={35} circle mb='xl' />
        <Box sx={{ flex: 1 }}>
          <Skeleton height={8} radius='xl' />
          <Skeleton height={8} mt={6} radius='xl' />
          <Skeleton height={8} mt={6} width='70%' radius='xl' />
        </Box>
      </Group>
    </Boxy>
  ) : !isAuthenticated ? (
    <Boxy theme={theme}>
      <Group grow>
        <LoginButton />
      </Group>
    </Boxy>
  ) : (
    <Boxy theme={theme}>
      <NavLink
        to='/settings'
        style={{ textDecoration: 'none' }}
        id='tour-userSettings'
      >
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          }}
        >
          <Group>
            <Avatar src={user.picture} radius='xl' />
            <Box sx={{ flex: 1 }}>
              <Text size='sm' weight={500}>
                {user.name}
              </Text>
              <Text color='dimmed' size='xs'>
                {user.email}
              </Text>
            </Box>
            <IconSettings size={rem(18)} />
          </Group>
        </UnstyledButton>
      </NavLink>
    </Boxy>
  );
}
