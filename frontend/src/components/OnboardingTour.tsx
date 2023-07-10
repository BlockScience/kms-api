import Joyride, { ACTIONS, EVENTS, STATUS, TooltipRenderProps, CallBackProps } from 'react-joyride'
import { useState } from 'preact/hooks'
import { ModKey, on } from '@/utils'
import {
  Box,
  Title,
  Paper,
  Button,
  Text,
  Group,
  rem,
  ThemeIcon,
  List,
  useMantineTheme,
  px,
  Kbd,
  Code,
} from '@mantine/core'
import {
  IconLayoutDashboard,
  IconAlertCircle,
  IconMessages,
  IconBinaryTree2,
  IconNotification,
  IconTimeline,
} from '@tabler/icons-react'

const tourSteps = [
  {
    title: 'A cybernetic implant for BlockScience',
    target: '#tour-welcome',
    content: (
      <Text align='left'>
        KMS is designed as an extension of the BlockScience org. It's designed to be{' '}
        <Text span fs='italic'>
          pragmatic and useful
        </Text>{' '}
        while also being a testbed for novel research. Go ahead and hit 'Next' to explore the web
        interface.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Searching the knowledgebase',
    target: '#tour-searchInput',
    content: (
      <>
        <Text align='left' pb='xs'>
          The <i>spotlight</i> interface is where all searches start — it's the command center of
          KMS. If you want to search the knowledgebase simply write your search and hit{' '}
          <Kbd>Enter</Kbd>
        </Text>
        <Text align='left' pb='sm'>
          <Kbd>/</Kbd> will open spotlight with an empty input from anywhere in the app.
        </Text>
        <Text align='left' pb='sm'>
          <Kbd>Alt</Kbd> <Kbd>/</Kbd> or typing <Kbd>{'?'}</Kbd> will let you run complex queries to
          filter, sort and group results.
        </Text>
        <Text align='left'>
          <Kbd>Shift</Kbd> <Kbd>/</Kbd> or typing <Kbd>{'>'}</Kbd> will let you run various commands
          so you can interact with KMS efficiently, all from your keyboard.
        </Text>
      </>
    ),
    disableBeacon: true,
  },
  {
    title: 'Have a look around',
    target: '.tour-navInternal',
    content: (
      <Text align='left'>
        <List>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconAlertCircle size={px('1rem')} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Governance
            </Text>{' '}
            is where collective decisions are made
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconLayoutDashboard size={px('1rem')} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Dashboard
            </Text>{' '}
            is a birds-eye view of the system
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconBinaryTree2 size={px('1rem')} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Schema
            </Text>{' '}
            is a non-enforced and always evolving guide to curation
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconTimeline size={px('1rem')} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Activity
            </Text>{' '}
            shows you what you've been up to{' '}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconMessages size={px('1rem')} />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Chat
            </Text>{' '}
            is a natural language (LLM) interface to KMS
          </List.Item>
        </List>
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Changing your preferences',
    target: '#tour-userSettings',
    content: <Text align='left'>You can view and update your preferences here.</Text>,
    disableBeacon: true,
  },
  {
    title: 'Useful links',
    target: '.tour-navExternal',
    content: (
      <Text align='left'>
        Down here are links if you want to jump into Slack, view the KMS repositories or dive deeper
        into the documentation.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Toggling dark mode',
    target: '.tour-toggleDarkmode',
    content: (
      <Text align='left'>
        Wether you're in a cave or on a beach, KMS has you covered. Try giving that button a click.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Collapsing the sidebar',
    target: '.tour-toggleSidebar',
    content: <Text align='left'>Collapse or expand the sidebar by clicking the divider here.</Text>,
    disableBeacon: true,
  },
]

function Tooltip({
  backProps,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  const theme = useMantineTheme()
  return (
    <Paper
      {...tooltipProps}
      maw={700}
      miw={500}
      bg={theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[0]}
    >
      <Box p='md'>
        {step.title && (
          <Title order={4} mb='md' variant='primary' align='center'>
            {step.title}
          </Title>
        )}
        {step.content && <Text align='center'>{step.content}</Text>}
      </Box>
      <Group position='apart' p={rem(10)} pt={0}>
        {!isLastStep && (
          <Button {...skipProps} size='sm' variant='default' compact id='skip'>
            <Text>Skip</Text>
          </Button>
        )}
        {isLastStep && <div></div>}
        <Group spacing={5} position='apart'>
          {index > 0 && (
            <Button {...backProps} size='sm' compact id='back'>
              <Text>Back</Text>
            </Button>
          )}
          <Button {...primaryProps} size='sm' compact id='next'>
            <Text>
              {isLastStep ? 'Finish' : 'Next'} ({index + 1}/{tourSteps.length})
            </Text>
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}

export function OnboardingTour() {
  const [state, setState] = useState({
    run: false,
    steps: tourSteps,
    stepIndex: 0,
  })
  on('guidedTour:start', () => {
    setState({ ...state, run: true })
  })

  const theme = useMantineTheme()

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data

    if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
      // Update state to advance the tour
      setState({
        ...state,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      })
    } else if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ ...state, run: false, stepIndex: 0 })
    }
  }

  return (
    <Joyride
      steps={state.steps}
      stepIndex={state.stepIndex}
      callback={handleJoyrideCallback}
      run={state.run}
      scrollToFirstStep
      // disableOverlayClose
      spotlightClicks
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        open: 'Open the dialog',
        skip: 'Skip',
      }}
      tooltipComponent={Tooltip}
      styles={{
        options: {
          arrowColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
          zIndex: 10000,
        },
      }}
    />
  )
}
