import {
  SpotlightProvider as MantineSpotlightProvider,
  SpotlightAction,
  useSpotlight,
} from '@/components/mantine-spotlight'
import { Group, rem, Text, Anchor, useMantineColorScheme, px } from '@mantine/core'
import { useNavigate, createSearchParams } from 'react-router-dom'
import {
  IconSearch,
  IconSun,
  IconInfoCircle,
  IconArrowRight,
  IconTerminal2,
} from '@tabler/icons-react'
import { useState } from 'preact/hooks'
import { notifications } from '@mantine/notifications'
import { VNode } from 'preact'

function ActionsWrapper({ children }: { children: VNode[] | VNode }) {
  const navigate = useNavigate()
  const spotlight = useSpotlight()
  return (
    <div>
      {children}
      <Group
        position='apart'
        px={15}
        py='xs'
        sx={(theme) => ({
          borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
        })}
      >
        <Group spacing='xs'>
          <IconInfoCircle size={px('1rem')} stroke={1} />
          <Text size='xs' color='dimmed'>
            Not sure what search can do?
          </Text>
        </Group>
        <Anchor
          size='xs'
          onClick={() => {
            navigate('/docs')
            spotlight.closeSpotlight()
          }}
        >
          Learn more
        </Anchor>
      </Group>
    </div>
  )
}

function removePrefix(string: string, prefix: string): string {
  return string.startsWith(prefix) ? string.slice(prefix.length) : string
}

interface SpotlightProps {
  children: VNode | VNode[]
}
export function SpotlightProvider({ children }: SpotlightProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { toggleColorScheme } = useMantineColorScheme()

  const commandPrefix = '>'
  const opNavigation = [
    {
      title: 'Dashboard',
      description: 'Go to dashboard',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/dashboard')
      },
    },
    {
      title: 'Governance',
      description: 'Go to governance',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/governance')
      },
    },
    {
      title: 'Schema',
      description: 'Go to schema',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/schema')
      },
    },
    {
      title: 'Activity',
      description: 'Go to activity',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/activity')
      },
    },
    {
      title: 'Chat',
      description: 'Go to chat',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/chat')
      },
    },
    {
      title: 'Documentation',
      description: 'Go to documentation',
      icon: <IconArrowRight size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/docs')
      },
    },
  ]
  const opCommands = [
    {
      title: 'Toggle Darkmode',
      description: 'Switch between light and dark themes',
      icon: <IconSun size={px('1.2rem')} />,
      onTrigger: () => {
        toggleColorScheme()
      },
    },
    {
      title: 'dev/notify',
      description: 'Show a notification',
      icon: <IconTerminal2 size={px('1.2rem')} />,
      onTrigger: () => {
        notifications.show({
          title: 'Default notification',
          message: 'Hey there, your code is awesome! 🤥',
        })
      },
    },
    {
      title: 'dev/graph view',
      description: 'Show the graph view',
      icon: <IconTerminal2 size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/experimental')
      },
    },
  ]
  const opSearch = [
    {
      title: `Search for "${query}"`,
      description: 'Search will match any title, text, or tags in the knowledgebase',
      onTrigger: () => {
        navigate({
          pathname: '/search',
          search: createSearchParams({
            q: query,
          }).toString(),
        })
      },
    },
  ]

  const actions: SpotlightAction[] = query.startsWith(commandPrefix)
    ? opCommands.concat(opNavigation)
    : query
    ? opSearch.concat(opCommands, opNavigation)
    : opCommands.concat(opNavigation)

  return (
    <MantineSpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={px('1.2rem')} />}
      searchPlaceholder='Search...'
      cleanQueryOnClose
      shortcut={[]}
      nothingFoundMessage="Hit 'Enter' to search..."
      query={query}
      onQueryChange={setQuery}
      transitionProps={{ duration: 0 }}
      limit={7}
      actionsWrapperComponent={ActionsWrapper}
      // TODO: Improve filtering, perhaps something similar to VS code
      filter={(query, actions) => {
        const isCommand = query.startsWith(commandPrefix)
        if (isCommand) {
          return actions.filter((action) =>
            action.title.toLowerCase().includes(removePrefix(query.toLowerCase(), commandPrefix)),
          )
        } else {
          return actions.filter(
            (action) =>
              action.title.toLowerCase().includes(query.toLowerCase()) ||
              (action.description &&
                action.description.toLowerCase().includes(query.toLowerCase())),
          )
        }
      }}
    >
      {/* 
      // @ts-ignore */}
      {children}
    </MantineSpotlightProvider>
  )
}
