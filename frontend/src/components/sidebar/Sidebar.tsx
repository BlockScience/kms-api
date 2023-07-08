import Navigation, { NavigationProps } from './sectionNavigation'
import { Header } from './sectionHeader'
import Search from './sectionSearch'
import User from './sectionUser'
import { Box, Divider, Stack, createStyles, px, useMantineTheme } from '@mantine/core'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import {
  IconAlertCircle,
  IconBinaryTree2,
  IconBrandGithub,
  IconBrandSlack,
  IconFileText,
  IconLayoutDashboard,
  IconMessages,
  IconTimeline,
} from '@tabler/icons-react'
import { useLocation } from 'react-router-dom'
const upperNavigation: NavigationProps[] = [
  {
    icon: <IconAlertCircle size={px('1rem')} />,
    color: 'teal',
    label: 'Governance',
    path: '/governance',
  },
  {
    icon: <IconLayoutDashboard size={px('1rem')} />,
    color: 'blue',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IconBinaryTree2 size={px('1rem')} />,
    color: 'violet',
    label: 'Schema',
    path: '/schema',
  },
  {
    icon: <IconTimeline size={px('1rem')} />,
    color: 'grape',
    label: 'Activity',
    path: '/activity',
  },
  {
    icon: <IconMessages size={px('1rem')} />,
    color: 'pink',
    label: 'Chat',
    path: '/chat',
  },
]

const lowerNavigation: NavigationProps[] = [
  {
    icon: <IconBrandSlack size={px('1rem')} />,
    color: 'gray',
    label: 'Slack',
    href: 'https://blockscienceteam.slack.com/archives/C029RATAVTJ',
  },
  {
    icon: <IconBrandGithub size={px('1rem')} />,
    color: 'gray',
    label: 'Github',
    href: 'https://github.com/blockScience/kms',
  },
  {
    icon: <IconFileText size={px('1rem')} />,
    color: 'gray',
    label: 'Documentation',
    path: '/docs',
  },
]

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
  },
  stack: {
    height: '100%',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.xs,
    paddingTop: theme.spacing.lg,
    justifyContent: 'space-between',

    '#sidebarDivider': {
      width: '3px',
      right: '-1px', // should be -((width/2)-0.5)
      position: 'absolute',
      top: '0px',
      height: '100%',
      opacity: 0.9,
      zIndex: 999,
      transition: '0.2s background-color',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[3],
        transitionDelay: '0.2s',
        cursor: 'pointer',
      },
    },
  },
}))

export function Sidebar() {
  const location = useLocation().pathname
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const bigScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
  const toggle = () => setprefersExpanded((v) => !v)
  const [prefersExpanded, setprefersExpanded] = useLocalStorage<boolean>({
    key: 'sidebar-prefer-expanded',
    defaultValue: true,
    getInitialValueInEffect: false,
  })

  // Override preference if screen is small
  const expandedState = bigScreen ? prefersExpanded : false

  return (
    <Box className={classes.container}>
      <Stack spacing='xs' className={classes.stack} w={expandedState ? 280 : 70}>
        <Box id='sidebarDivider' className='tour-toggleSidebar' onClick={toggle} />
        <Stack spacing='xs'>
          <Header expanded={expandedState} onToggle={toggle} />
          <Divider />
          <Search expanded={expandedState} />
          <Stack className='tour-navInternal' spacing={0}>
            {upperNavigation.map((link) => (
              <Navigation
                {...link}
                key={link.label}
                active={link.path === location}
                expanded={expandedState}
              />
            ))}
          </Stack>
        </Stack>
        <Stack spacing='xs'>
          <Stack className='tour-navExternal' spacing={0}>
            {lowerNavigation.map((link) => (
              <Navigation
                {...link}
                key={link.label}
                active={link.path === location}
                expanded={expandedState}
              />
            ))}
          </Stack>
          <Divider />
          <User expanded={expandedState} />
        </Stack>
      </Stack>
    </Box>
  )
}
