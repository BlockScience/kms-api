import {
  createStyles,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Code,
  Anchor,
  Box,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { trigger } from '@/utilities/events'
import ImageWelcome from '@/assets/homeImage'

import { SetTitle } from '@/utilities/metadata'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({
      variant: 'light',
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}))

export default function Home() {
  const { classes } = useStyles()
  return (
    <>
      <SetTitle text='KMS' noPrefix />
      <Box maw={1000} mx='auto'>
        <div>
          <Container>
            <div className={classes.inner}>
              <div className={classes.content}>
                <Title className={classes.title} id='tour-welcome'>
                  A{' '}
                  <Text
                    component='span'
                    inherit
                    variant='gradient'
                    gradient={{ from: 'cyan', to: 'grape' }}
                  >
                    cybernetically enhanced
                  </Text>{' '}
                  knowledge system.
                </Title>
                <Text color='dimmed' mt='md'>
                  A lightweight, powerful tool to find and organise knowledge objects. All made just
                  for us!
                </Text>

                <List mt={30} spacing='sm' size='sm'>
                  <List.Item
                    icon={
                      <ThemeIcon size={20} radius='xl'>
                        <IconCheck size={rem(13)} />
                      </ThemeIcon>
                    }
                  >
                    <b>Search-based UX</b> – just hit <Code color='gray'>/</Code> to start
                    searching. No knowledge required.
                  </List.Item>
                  <List.Item
                    icon={
                      <ThemeIcon size={20} radius='xl'>
                        <IconCheck size={rem(13)} />
                      </ThemeIcon>
                    }
                  >
                    <b>Powerful query system</b> – searches can be filtered, sorted, and grouped
                    with both UI and text syntax. <Anchor>Learn more.</Anchor>
                  </List.Item>
                  <List.Item
                    icon={
                      <ThemeIcon size={20} radius='xl'>
                        <IconCheck size={rem(13)} />
                      </ThemeIcon>
                    }
                  >
                    <b>Programmatically accessible</b> – want to do curation en masse? Do some data
                    science? You can interact with the system via its <Anchor>APIs</Anchor> and{' '}
                    <Anchor>libraries</Anchor>.
                  </List.Item>
                  <List.Item
                    icon={
                      <ThemeIcon size={20} radius='xl'>
                        <IconCheck size={rem(13)} />
                      </ThemeIcon>
                    }
                  >
                    <b>Anti-software</b> – KMS is part of an effort to improve our collective{' '}
                    <Text span fs='italic'>
                      Knowledge Organisation Infrastructure.
                    </Text>{' '}
                    In contrast to a software product, success for KMS means eventually melting away
                    into the improved infrastructure of the future.
                  </List.Item>
                </List>

                <Group mt={30}>
                  <Button
                    radius='xl'
                    size='md'
                    className={classes.control}
                    onClick={() => trigger('guidedTour:start', {})}
                  >
                    Take the tour
                  </Button>
                  <Button
                    variant='default'
                    radius='xl'
                    size='md'
                    className={classes.control}
                    component='a'
                    target='_blank'
                    href='https://blockscience.github.io/kms/'
                  >
                    Read the docs
                  </Button>
                </Group>
              </div>
              <ImageWelcome />
            </div>
          </Container>
        </div>
      </Box>
    </>
  )
}
