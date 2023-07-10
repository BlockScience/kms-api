import {
  SpotlightProvider as MantineSpotlightProvider,
  SpotlightAction,
  SpotlightActionProps,
  useSpotlight,
} from '@/components/mantine-spotlight'
import {
  Group,
  rem,
  Text,
  Anchor,
  useMantineColorScheme,
  px,
  Code,
  UnstyledButton,
  Center,
  createStyles,
  Badge,
} from '@mantine/core'
import { useNavigate, createSearchParams } from 'react-router-dom'
import {
  IconSearch,
  IconSun,
  IconInfoCircle,
  IconArrowRight,
  IconTerminal2,
} from '@tabler/icons-react'
import { useEffect, useState } from 'preact/hooks'
import { notifications } from '@mantine/notifications'
import { VNode } from 'preact'
import { parser } from '@/parsers/parser-7'

const useStyles = createStyles((theme) => ({
  action: {
    position: 'relative',
    display: 'block',
    width: '100%',
    padding: `${rem(10)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
    }),

    '&[data-hovered]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
    },
  },
}))

function CustomAction({
  action,
  styles,
  classNames,
  hovered,
  onTrigger,
  ...others
}: SpotlightActionProps) {
  const { classes } = useStyles(null, { styles, classNames, name: 'Spotlight' })

  return (
    <>
      <UnstyledButton
        className={classes.action}
        data-hovered={hovered || undefined}
        tabIndex={-1}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onTrigger}
        {...others}
      >
        <Group noWrap>
          {action.icon && <Center>{action.icon}</Center>}

          <div style={{ flex: 1 }}>
            <Text>{action.title}</Text>

            {action.description && (
              <Text color='dimmed' size='xs'>
                {action.description}
              </Text>
            )}
          </div>

          {action.new && <Badge>new</Badge>}
        </Group>
      </UnstyledButton>
      {action.below && (
        <Group mt={5} grow>
          {action.below}
        </Group>
      )}
    </>
  )
}

function Footer({ children }: { children: VNode[] | VNode }) {
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

interface SpotlightProps {
  children: VNode | VNode[]
}
export function Spotlight({ children }: SpotlightProps) {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [parserError, setParserError] = useState<string | null>('')
  const { toggleColorScheme } = useMantineColorScheme()
  const commandPrefix = '>'
  const queryPrefix = '?'

  const query = removePrefix(input, queryPrefix).trim()

  function removePrefix(string: string, prefix: string): string {
    return string.startsWith(prefix) ? string.slice(prefix.length) : string
  }

  useEffect(() => {
    if (input.startsWith(queryPrefix)) {
      try {
        parser.parse(query)
        setParserError(null)
      } catch (e) {
        if (e.name === 'SyntaxError') {
          setParserError(e.message)
        }
      }
    }
    // const command = remove
  }, [input])

  const actionsCommand: SpotlightAction[] = [
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
        navigate('/graph')
      },
    },
    {
      title: 'dev/PEG parser',
      description: 'Test environment for the PEG parser',
      icon: <IconTerminal2 size={px('1.2rem')} />,
      onTrigger: () => {
        navigate('/query-test')
      },
    },
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
  const actionsSearch: SpotlightAction[] = [
    {
      title: `Search for "${input}"`,
      description: 'Search will match any title, text, or tags in the knowledgebase',
      onTrigger: () => {
        navigate({
          pathname: '/search',
          search: createSearchParams({
            q: input,
          }).toString(),
        })
      },
    },
  ]
  const actionsQuery: SpotlightAction[] = [
    {
      title: `Query for "${query}"`,
      below: parserError ? (
        <Code color='red'>{parserError}</Code>
      ) : (
        <Code color='green'>Syntax appears valid</Code>
      ),
      // description: parserError || 'Valid syntax!',
      onTrigger: () => {},
    },
  ]

  const actions: SpotlightAction[] = input.startsWith(commandPrefix)
    ? actionsCommand
    : input.startsWith(queryPrefix)
    ? actionsQuery
    : input
    ? actionsSearch.concat(actionsCommand)
    : actionsCommand

  return (
    <MantineSpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={px('1.2rem')} />}
      searchPlaceholder='Search...'
      cleanQueryOnClose
      nothingFoundMessage='Nothing found...'
      query={input}
      onQueryChange={setInput}
      transitionProps={{ duration: 0 }}
      limit={7}
      actionsWrapperComponent={Footer}
      actionComponent={CustomAction}
      // TODO: Improve filtering, perhaps something similar to VS code
      filter={(query, actions) => {
        const isQuery = query.startsWith(queryPrefix)
        const isCommand = query.startsWith(commandPrefix)

        if (isQuery) {
          return actionsQuery
        } else if (isCommand) {
          return actions.filter((action) =>
            action.title
              .toLowerCase()
              .includes(removePrefix(query.toLowerCase(), commandPrefix).trim()),
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
