import Joyride, {
  ACTIONS,
  EVENTS,
  STATUS,
  TooltipRenderProps,
  CallBackProps,
} from 'react-joyride';
import { useState } from 'react';
import { on } from '@/utilities/events';
import { useTheme } from '@/utilities/theme';
import {
  Box,
  Title,
  Paper,
  Button,
  Text,
  Group,
  rem,
  Code,
  ThemeIcon,
  List,
} from '@mantine/core';
import {
  IconLayoutDashboard,
  IconAlertCircle,
  IconMessages,
  IconBinaryTree2,
  IconNotification,
} from '@tabler/icons-react';

const tourSteps = [
  {
    title: 'A cybernetic implant for BlockScience',
    target: '#tour-welcome',
    content: (
      <Text align='left'>
        KMS is designed as an extension of the BlockScience org. It's designed
        to be{' '}
        <Text span fs='italic'>
          pragmatic and useful
        </Text>{' '}
        while also being a testbed for novel research. Go ahead and hit 'Next'
        to explore the web interface.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Toggling Dark Mode',
    target: '#tour-toggleDarkmode',
    content: (
      <Text align='left'>
        Wether you're in a cave or on a beach, KMS has you covered. Try giving
        that button a click.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Searching the Knowledgebase',
    target: '#tour-searchInput',
    content: (
      <>
        <Text align='left'>
          Search is as simple as hitting the search bar and entering your query.
        </Text>
        <Text align='left'>
          You can also hit <Code color='gray'>/</Code> or{' '}
          <Code color='gray'>CTRL/CMD + P</Code> to open the search dialogue.
        </Text>
      </>
    ),
    disableBeacon: true,
  },
  {
    title: 'Changing your Preferences',
    target: '#tour-userSettings',
    content: (
      <Text align='left'>
        You can view and update your preferences here. E.g. to customise how
        many search results you see at once.
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Have a look around',
    target: '#tour-navInternal',
    content: (
      <Text align='left'>
        <List>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconLayoutDashboard size='1rem' />
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
                <IconAlertCircle size='1rem' />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Proposals
            </Text>{' '}
            are changes which have been created programmatically
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color='gray' size={24} radius='xl'>
                <IconBinaryTree2 size='1rem' />
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
                <IconNotification size='1rem' />
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
                <IconMessages size='1rem' />
              </ThemeIcon>
            }
          >
            <Text span fw={700}>
              Chat
            </Text>{' '}
            is a natural language interface to KMS just like chatGPT.
          </List.Item>
        </List>
      </Text>
    ),
    disableBeacon: true,
  },
  {
    title: 'Useful Links',
    target: '#tour-navExternal',
    content: (
      <Text align='left'>
        Down here are links if you want to jump into Slack, view the KMS
        repositories or dive deeper into the documentation.
      </Text>
    ),
    disableBeacon: true,
  },
];

function Tooltip({
  backProps,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  const theme = useTheme();
  return (
    <Paper
      {...tooltipProps}
      maw={700}
      miw={500}
      bg={
        theme.colorScheme === 'dark'
          ? theme.colors.gray[9]
          : theme.colors.gray[0]
      }
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
  );
}

export function GuidedTour() {
  const [state, setState] = useState({
    run: false,
    steps: tourSteps,
    stepIndex: 0,
  });
  on('guidedTour:start', () => {
    setState({ ...state, run: true });
  });

  const theme = useTheme();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setState({
        ...state,
        stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
      });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ ...state, run: false, stepIndex: 0 });
    }
  };

  return (
    <Joyride
      steps={state.steps}
      callback={handleJoyrideCallback}
      run={state.run}
      scrollToFirstStep
      disableOverlayClose
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
          arrowColor:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[9]
              : theme.colors.gray[1],
          zIndex: 10000,
        },
      }}
    />
  );
}
