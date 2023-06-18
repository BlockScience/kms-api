import Joyride, { ACTIONS, EVENTS, STATUS, TooltipRenderProps } from 'react-joyride';
import { useState, useCallback } from 'react';
import { on } from '@/utilities/events';
import { useTheme } from '@/utilities/theme';
import { Box, Title, Paper, Button, Text, Group, rem } from '@mantine/core';

const tourSteps = [
  {
    title: 'Welcome to KMS',
    target: '#tour-welcome',
    content: 'This is my awesome feature!',
    placement: 'auto',
    disableBeacon: true,
  },
  {
    target: '#tour-toggleDarkmode',
    content: 'This another awesome feature!',
    placement: 'auto',
    disableBeacon: true
  },
  {
    target: '#tour-searchInput',
    content: 'This another awesome feature!',
    placement: 'auto',
    disableBeacon: true
  },
];

function Tooltip({
  backProps,
  continuous,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  const theme = useTheme();
  return (
    <Paper {...tooltipProps} maw={700} miw={500} bg={theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1]}>
      <Box p="md">
        {step.title && (
          <Title order={4} mb="md" variant="primary" align="center">
            {step.title}
          </Title>
        )}
        {step.content && <Text align='center'>{step.content}</Text>}
      </Box>
      <Group position="apart" p={rem(10)} pt={0}>
        {!isLastStep && (
          <Button {...skipProps} size="sm" variant="default" compact id="skip">
            <Text  >Skip</Text>
          </Button>
        )}
        {isLastStep && <div></div>}
        <Group spacing={5} position='apart'>
          {index > 0 && (
            <Button {...backProps} size="sm" compact id="back">
              <Text>Back</Text>
            </Button>
          )}
          <Button {...primaryProps} size="sm" compact id={continuous ? 'next' : 'close'}>
            <Text >{isLastStep ? "Finish" : "Next"} ({index + 1}/{tourSteps.length})</Text>
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
  })
  on("guidedTour:start", () => { setState({ ...state, run: true }); });
  const theme = useTheme();

  const handleJoyrideCallback = useCallback((data: any) => {

    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setState({ ...state, stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    }
    else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ ...state, run: false, stepIndex: 0 });
    }
  }, []);
  return (
    <Joyride
      steps={state.steps}
      callback={handleJoyrideCallback}
      run={state.run}
      stepIndex={state.stepIndex}
      showSkipButton
      showProgress
      continuous
      scrollToFirstStep
      locale={{ back: 'Back', close: 'Close', last: 'Finish', next: 'Next', open: 'Open the dialog', skip: 'Skip' }}
      tooltipComponent={Tooltip}
      styles={{
        options: {
          arrowColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1]
        }
      }}
    />
  );
}