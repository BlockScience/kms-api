import {
  SpotlightProvider,
  SpotlightAction,
  // spotlight,
  useSpotlight,
} from '@/components/mantine-spotlight'
import { getHotkeyHandler } from '@mantine/hooks'
import { Group, rem, Text, Anchor, useMantineColorScheme } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconSearch, IconSun, IconInfoCircle } from '@tabler/icons-react'
import { useState } from 'react'

interface SpotlightProps {
  children: React.ReactNode
}

function ActionsWrapper({ children }: { children: React.ReactNode }) {
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
          <IconInfoCircle size='1rem' stroke={1} />
          <Text size='xs' color='dimmed'>
            Not the results you expected?
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

export function CustomSpotlightProvider({ children }: SpotlightProps) {
  const [query, setQuery] = useState('')
  const { toggleColorScheme } = useMantineColorScheme()

  const commandPrefix = '>'
  const navigate = useNavigate()
  function handleSearch(query: string) {
    navigate('/search', { state: { q: query } })
  }

  const opCommands = [
    {
      title: 'thing1',
      description: 'aegaeg this is a descriptiopn',
      onTrigger: () => {},
    },
    {
      title: 'command 2',
      description: 'Something describing this',
      onTrigger: () => {},
    },
    {
      title: 'command 3',
      onTrigger: () => {},
    },
    {
      title: 'Toggle Darkmode',
      icon: <IconSun size='1.2rem' />,
      onTrigger: () => {
        toggleColorScheme()
      },
    },
  ]
  const opSearch = [
    {
      title: `Search for: ${query}`,
      onTrigger: () => {
        handleSearch(query)
      },
    },
  ]

  const actions: SpotlightAction[] = query.startsWith(commandPrefix)
    ? opCommands
    : query
    ? opSearch.concat(opCommands)
    : opCommands

  return (
    <SpotlightProvider
      // Custom shortcuts for nice prefixing
      actions={actions}
      searchIcon={<IconSearch size='1.2rem' />}
      searchPlaceholder='Search...'
      cleanQueryOnClose
      shortcut={[]}
      nothingFoundMessage="Hit 'Enter' to search..."
      query={query}
      onQueryChange={setQuery}
      transitionProps={{ duration: 100 }}
      limit={7}
      actionsWrapperComponent={ActionsWrapper}
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
      {children}
    </SpotlightProvider>
  )
}
