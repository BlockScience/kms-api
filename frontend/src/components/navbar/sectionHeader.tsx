import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  rem,
  Text,
  createStyles,
  Center,
  useMantineTheme,
  Stack,
} from '@mantine/core'
import { IconSun, IconMoonStars, IconX, IconMenu2 } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import LogoLight from '@/assets/logoLight'
import LogoDark from '@/assets/logoDark'

const useStyles = createStyles((theme, { fullwidth }: { fullwidth?: boolean }) => ({
  logoText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },
  box: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
  },
  navText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
  navLink: {
    marginBottom: 0,
  },
}))

export function Header({ fullwidth, onToggle }: { fullwidth?: boolean; onToggle(): void }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles({ fullwidth })
  const theme = useMantineTheme()
  const kmsVersion = 1.1

  const logoIcon = () => {
    return colorScheme === 'dark' ? <LogoLight /> : <LogoDark />
  }
  const darkmodeButton = () => {
    return (
      <ActionIcon
        id='tour-toggleDarkmode'
        variant='default'
        onClick={() => toggleColorScheme()}
        size={30}
      >
        {theme.colorScheme === 'dark' ? <IconSun size='1rem' /> : <IconMoonStars size='1rem' />}
      </ActionIcon>
    )
  }
  const sidebarButton = (icon) => {
    return (
      <ActionIcon
        className='tour-toggleSidebar'
        variant='default'
        onClick={onToggle}
        size={30}
        color={theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[7]}
      >
        {icon}
      </ActionIcon>
    )
  }
  const wideHeader = () => {
    return (
      <Group position='apart' className={classes.box}>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Group>
            {logoIcon()}
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
          {darkmodeButton()}
          {sidebarButton(<IconX size='1rem' />)}
          {/* <IconX size='1rem' /> */}
          {/* </ActionIcon> */}
          {/* </Group> */}
        </Group>
      </Group>
    )
  }
  const narrowHeader = () => {
    return (
      <Box className={classes.box}>
        <Stack align='center'>
          <NavLink to='/'>{logoIcon}</NavLink>
          {sidebarButton(<IconMenu2 size='1rem' />)}
          <ActionIcon
            id='tour-toggleDarkmode'
            variant='default'
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {darkmodeButton()}
          </ActionIcon>
        </Stack>
      </Box>
    )
  }
  return fullwidth ? wideHeader() : narrowHeader()
}
