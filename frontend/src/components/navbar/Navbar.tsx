import { Header } from '@/components/navbar/sectionHeader'
import { User } from '@/components/navbar/sectionUser'
import { Navigation, NavLinkProps } from '@/components/navbar/sectionNavigation'
import { currentColorScheme } from '@/utilities/theme'
import { useSpotlight } from '@/components/mantine-spotlight'
import {
  Badge,
  Box,
  Navbar as MantineNavbar,
  Space,
  TextInput,
  createStyles,
  rem,
} from '@mantine/core'
import { BaseSyntheticEvent, useState } from 'react'
import {
  IconSearch,
  IconFileText,
  IconBrandSlack,
  IconBrandGithub,
  IconLayoutDashboard,
  IconAlertCircle,
  IconMessages,
  IconBinaryTree2,
  IconTimeline,
} from '@tabler/icons-react'

const upperNavigation: NavLinkProps[] = [
  {
    icon: <IconLayoutDashboard size='1rem' />,
    color: 'blue',
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IconAlertCircle size='1rem' />,
    color: 'teal',
    label: 'Proposals',
    path: '/proposals',
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

const lowerNavigation: NavLinkProps[] = [
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

const navbarStyles = createStyles((theme) => ({
  searchInputShortcut: {
    color: currentColorScheme() === 'dark' ? theme.colors.gray[1] : theme.colors.gray[7],
    backgroundColor: currentColorScheme() === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
  },
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export function Navbar() {
  const { classes } = navbarStyles()
  const [active, setActive] = useState([null, null])
  const spotlight = useSpotlight()

  const onSelectSearchInput = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    e.target.blur()
    spotlight.openSpotlight()
  }

  const lowerNavLinks = lowerNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === active[0]}
      onLinkActive={() => link.path && setActive([index, null])}
    />
  ))

  const upperNavLinks = upperNavigation.map((link, index) => (
    <Navigation
      {...link}
      key={link.label}
      active={index === active[1]}
      onLinkActive={() => link.path && setActive([null, index])}
    />
  ))

  return (
    <MantineNavbar p='xs' width={{ base: 300 }} fixed={true} position={{ top: 0, left: 0 }}>
      <MantineNavbar.Section mt='xs'>
        <Header />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mx='-xs' px='xs'>
        <Box py='md'>
          <TextInput
            id='tour-searchInput'
            onMouseDown={onSelectSearchInput}
            style={{ cursor: 'pointer' }}
            placeholder='Search'
            icon={<IconSearch size='1rem' />}
            rightSection={
              <Badge size='xs' radius='xs' variant='filled' className={classes.searchInputShortcut}>
                /
              </Badge>
            }
          />
          <Space h='xs' />
          {upperNavLinks}
        </Box>
      </MantineNavbar.Section>
      <MantineNavbar.Section>{lowerNavLinks}</MantineNavbar.Section>
      <MantineNavbar.Section>
        <User />
      </MantineNavbar.Section>
    </MantineNavbar>
  )
}
