import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  rem,
  Text,
  createStyles,
  Center,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import LogoLight from '@/assets/logoLight'
import LogoDark from '@/assets/logoDark'
import { useAuth0 } from '@auth0/auth0-react'

const useStyles = createStyles((theme) => ({
  logoText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },
  box: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingBottom: theme.spacing.lg,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
  navText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
}))

interface LogoutProps {
  color: string
  label: string
}
export default function Logout({ color, label }: LogoutProps) {
  const { classes } = useStyles()
  const { logout } = useAuth0()
  return (
    <UnstyledButton
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.fn.rgba(theme.fn.darken(theme.fn.themeColor(color), 0.2), 0.1),
        },
      })}
    >
      <Group>
        <ThemeIcon color='gray' variant='light'>
          <IconLogout size='1rem' />
        </ThemeIcon>
        <Text size='sm' className={classes.navText}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles()
  const { isAuthenticated, logout } = useAuth0()
  const kmsVersion = 1.1
  return (
    <Box className={classes.box}>
      <Group position='apart'>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Group>
            {colorScheme === 'dark' ? <LogoLight /> : <LogoDark />}
            <Text className={classes.logoText} td='none'>
              KMS{' '}
              <Center inline>
                <Text span inherit fz='sm' c='dimmed'>
                  v{kmsVersion}
                </Text>
              </Center>
            </Text>
          </Group>
        </NavLink>
        <Group spacing='xs'>
          <ActionIcon
            id='tour-toggleDarkmode'
            variant='default'
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? <IconSun size='1rem' /> : <IconMoonStars size='1rem' />}
          </ActionIcon>
          {isAuthenticated ? (
            <ActionIcon
              variant='default'
              size={30}
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              <IconLogout size='1rem' />
            </ActionIcon>
          ) : (
            <></>
          )}
        </Group>
      </Group>
    </Box>
  )
}
