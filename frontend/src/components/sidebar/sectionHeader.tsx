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
  px,
} from '@mantine/core'
import { IconSun, IconMoonStars, IconX, IconMenu2 } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import LogoLight from '@/assets/images/logoLight'
import LogoDark from '@/assets/images/logoDark'
import { NavTooltip } from './Tooltip'

const useStyles = createStyles((theme) => ({
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
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const kmsVersion = 1.1

  const logoIcon = () => {
    return colorScheme === 'dark' ? <LogoLight /> : <LogoDark />
  }
  const DarkmodeButton = (
    <ActionIcon
      id='tour-toggleDarkmode'
      variant='default'
      onClick={() => toggleColorScheme()}
      size={30}
    >
      {theme.colorScheme === 'dark' ? (
        <IconSun size={px('1rem')} />
      ) : (
        <IconMoonStars size={px('1rem')} />
      )}
    </ActionIcon>
  )
  const SidebarToggler = (
    <ActionIcon
      className='tour-toggleSidebar'
      variant='default'
      onClick={onToggle}
      size={30}
      color={theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[7]}
    >
      {fullwidth ? <IconX size={px('1rem')} /> : <IconMenu2 size={px('1rem')} />}
    </ActionIcon>
  )
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
          {DarkmodeButton}
          {SidebarToggler}
        </Group>
      </Group>
    )
  }
  const narrowHeader = () => {
    return (
      <Box className={classes.box}>
        <Stack align='center'>
          <NavLink to='/'>{logoIcon}</NavLink>
          <NavTooltip label='Expand Sidebar'>{SidebarToggler}</NavTooltip>
          <NavTooltip label='Toggle Dark Mode'>{DarkmodeButton}</NavTooltip>
        </Stack>
      </Box>
    )
  }
  return fullwidth ? wideHeader() : narrowHeader()
}
