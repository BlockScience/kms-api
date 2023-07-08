import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  Text,
  createStyles,
  Center,
  useMantineTheme,
  Stack,
  px,
} from '@mantine/core'
import { IconSun, IconMoonStars, IconX, IconMenu2 } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'
import LogoLight from '@/assets/images/bsci_glyph_light.svg'
import LogoDark from '@/assets/images/bsci_glyph_dark.svg'
import { NavTooltip } from './Tooltip'
import { KMS_VERSION } from '@/config'

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

export function Header({ expanded, onToggle }: { expanded?: boolean; onToggle(): void }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { classes } = useStyles()
  const theme = useMantineTheme()

  const Icon = () => {
    const width = px('2.2rem')
    const dark = colorScheme === 'dark'
    return <img src={dark ? LogoLight : LogoDark} width={width} />
  }

  const DarkmodeButton = (
    <ActionIcon
      className='tour-toggleDarkmode'
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
      {expanded ? <IconX size={px('1rem')} /> : <IconMenu2 size={px('1rem')} />}
    </ActionIcon>
  )
  const headerExpanded = () => {
    return (
      <Group position='apart' className={classes.box}>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Group>
            <Icon />
            <Text className={classes.logoText} td='none'>
              KMS{' '}
              <Center inline>
                <Text span inherit fz='sm' c='dimmed'>
                  {KMS_VERSION}
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
  const headerCollapsed = () => {
    return (
      <Box className={classes.box}>
        <Stack align='center'>
          <NavLink to='/'>{Icon}</NavLink>
          <NavTooltip label='Expand Sidebar'>{SidebarToggler}</NavTooltip>
          <NavTooltip label='Toggle Dark Mode'>{DarkmodeButton}</NavTooltip>
        </Stack>
      </Box>
    )
  }
  return expanded ? headerExpanded() : headerCollapsed()
}
