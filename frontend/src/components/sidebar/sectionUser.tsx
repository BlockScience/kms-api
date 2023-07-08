import { IconLogin, IconLogout } from '@tabler/icons-react'
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Skeleton,
  Button,
  ActionIcon,
  Center,
  Stack,
  createStyles,
  Loader,
  Tooltip,
  px,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { NavTooltip } from './Tooltip'

const useStyles = createStyles((theme) => ({
  base: {
    paddingRight: theme.spacing.xs,
    a: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: '...',
    },
  },
  baseButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

export default function User({ expanded }: { expanded: boolean }) {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0()

  const loginCompact = (
    <Center>
      <NavTooltip label='Log In'>
        <ActionIcon
          size={30}
          variant='filled'
          color={theme.colorScheme == 'dark' ? 'green.9' : 'green.3'}
          onClick={() => loginWithRedirect()}
        >
          <IconLogin size={px('1rem')} color={theme.colorScheme == 'dark' ? 'white' : 'black'} />
        </ActionIcon>
      </NavTooltip>
    </Center>
  )
  const loadingWide = (
    <Group align='center' style={{ padding: 9.5 }}>
      <Skeleton width={40} height={40} circle />
      <Box sx={{ flex: 1 }}>
        <Skeleton height={12} mb={10} width='85%' radius='xl' />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />
      </Box>
    </Group>
  )
  const loadingCompact = (
    <Center>
      <Loader size={px('1.8rem')} color='gray' />
    </Center>
  )
  const loginWide = (
    <Group grow>
      <Button color='green' onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </Group>
  )
  const userAvater = (
    <Avatar alt='' radius='xl' color='gray' variant='filled'>
      {user?.name.slice(0, 2).toUpperCase()}
    </Avatar>
  )
  const userLoggedInSmall = () => {
    return (
      <Stack spacing='md' pt='sm' p={0} justify='center' className={classes.base}>
        <Center>
          <NavTooltip label='Log Out'>
            <ActionIcon
              variant='default'
              color='red'
              size={30}
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              <IconLogout
                size={px('1rem')}
                color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : 'black'}
              />
            </ActionIcon>
          </NavTooltip>
        </Center>
        <NavLink to='/settings' style={{ textDecoration: 'none' }} id='tour-userSettings'>
          <NavTooltip label='Settings'>
            <Center style={{ cursor: 'pointer' }}>{userAvater}</Center>
          </NavTooltip>
        </NavLink>
      </Stack>
    )
  }
  const userLoggedInLarge = () => {
    return (
      <Group noWrap position='apart' w='100%' className={classes.base}>
        <NavLink to='/settings' id='tour-userSettings'>
          <UnstyledButton
            className={classes.baseButton}
            style={{ whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis' }}
          >
            <Group noWrap spacing='xs'>
              {userAvater}
              <Box>
                <Text size='sm' weight={500}>
                  {user?.name}
                </Text>
                <Text color='dimmed' size='xs'>
                  {user?.email}
                </Text>
              </Box>
            </Group>
          </UnstyledButton>
        </NavLink>
        <ActionIcon
          variant='default'
          size={30}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          <IconLogout
            size={px('1rem')}
            color={theme.colorScheme === 'dark' ? theme.colors.gray[0] : 'black'}
          />
        </ActionIcon>
      </Group>
    )
  }

  const sidebarCollapsed = isLoading
    ? loadingCompact
    : !isAuthenticated
    ? loginCompact
    : userLoggedInSmall()
  const sidebarExpanded = isLoading
    ? loadingWide
    : !isAuthenticated
    ? loginWide
    : userLoggedInLarge()

  return <Box>{expanded ? sidebarExpanded : sidebarCollapsed}</Box>
}
