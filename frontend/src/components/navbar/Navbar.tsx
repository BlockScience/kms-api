import { Header } from '@/components/navbar/sectionHeader'
import Navigation, { NavigationProps } from '@/components/navbar/sectionNavigation'
import Search from '@/components/navbar/sectionSearch'
import User from '@/components/navbar/sectionUser'
import {
  Box,
  Divider,
  Space,
  Stack,
  Tooltip,
  createStyles,
  getStylesRef,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
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
import { ReactNode, useState } from 'react'

const upperNavigation: NavigationProps[] = [
  {
    icon: <IconAlertCircle size='1rem' />,
    color: 'teal',
    label: 'Governance',
    path: '/governance',
  },
  {
    icon: <IconLayoutDashboard size='1rem' />,
    color: 'blue',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IconBinaryTree2 size='1rem' />,
    color: 'violet',
    label: 'Schema',
    path: '/schema',
  },
  {
    icon: <IconTimeline size='1rem' />,
    color: 'grape',
    label: 'Activity',
    path: '/activity',
  },
  {
    icon: <IconMessages size='1rem' />,
    color: 'pink',
    label: 'Chat',
    path: '/chat',
  },
]

const lowerNavigation: NavigationProps[] = [
  {
    icon: <IconBrandSlack size='1rem' />,
    color: 'gray',
    label: 'Slack',
    href: 'https://blockscienceteam.slack.com/archives/C029RATAVTJ',
  },
  {
    icon: <IconBrandGithub size='1rem' />,
    color: 'gray',
    label: 'Github',
    href: 'https://github.com/blockScience/kms',
  },
  {
    icon: <IconFileText size='1rem' />,
    color: 'gray',
    label: 'Documentation',
    path: '/docs',
  },
]

interface NavTooltipProps {
  label: string
  visible: string
  children?: ReactNode
}
export const NavTooltip = ({ label, visible, children }: NavTooltipProps) => {
  return visible ? <Tooltip label={label}>{children}</Tooltip> : { children }
}

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
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

    '#navbar': {},

    '#navbarDivider': {
      width: '5px',
      right: '-2px', // should be -((width/2)-0.5)
      position: 'absolute',
      top: '0px',
      height: '100%',
      // border: '17px solid red',
      // padding: '20px',
      opacity: 0.9,
      zIndex: 999,
      transition: '0.2s background-color',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[3],
        transitionDelay: '0.2s',
        cursor: 'col-resize',
      },
    },
  },
}))

export function Navbar() {
  const [active, setActive] = useState([null, null])
  // const [width, setWidth] = useState(280)
  // const [isDragging, setIsDragging] = useState(false)
  const [opened, { toggle, close }] = useDisclosure(true)
  const theme = useMantineTheme()
  const bigScreen = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)
  const fullWidthNav = bigScreen ? opened : false
  const { classes } = useStyles({ opened })

  // TODO: find a viable way to do drag-based events in react
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const flags = event.buttons !== undefined ? event.buttons : event.which
    const primaryMouseButtonDown = (flags & 1) === 1
    if (!primaryMouseButtonDown) {
      return
    }
    setWidth(event.clientX)
  }

  const upperNavLinks = upperNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === active[1]}
      fullwidth={fullWidthNav}
      onLinkActive={() => link.path && setActive([null, index])}
    />
  ))
  const lowerNavLinks = lowerNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === active[0]}
      fullwidth={fullWidthNav}
      onLinkActive={() => link.path && setActive([index, null])}
    />
  ))
  return (
    <Box id='navbarContainer' className={classes.container}>
      <Stack id='navbar' spacing='xs' className={classes.stack} maw={400}>
        <Box id='navbarDivider' onClick={toggle} />
        <Stack spacing='xs'>
          <Header fullwidth={fullWidthNav} onToggle={toggle} />
          <Divider />
          <Search fullwidth={fullWidthNav} />
          <Stack spacing={0}>{upperNavLinks}</Stack>
        </Stack>
        <Stack spacing='xs'>
          <Stack spacing={0}>{lowerNavLinks}</Stack>
          <Divider />
          <User fullwidth={fullWidthNav} />
        </Stack>
      </Stack>
    </Box>
  )
}
