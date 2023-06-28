import { Paper, Text, Title, Group, Button, useMantineTheme } from '@mantine/core'

interface ProposalProps {
  title: string
  description: string
  author: string
  operations: number
  status: string
  resolvedBy: string | null
}

export function CurationProposal(proposal: ProposalProps) {
  const theme = useMantineTheme()
  return (
    <Paper shadow='sm' p='sm' withBorder radius='md'>
      <Group position='apart'>
        <Group>
          <Title order={5}>{proposal.title}</Title>
          <Text size='sm' c='dimmed'>
            {proposal.author}
          </Text>
        </Group>
        <Group>
          {proposal.status === 'pending' && (
            <Group>
              <Text size='sm' c='dimmed'>
                {proposal.operations.toString()} operations pending
              </Text>
              <Button.Group>
                <Button color='green' size='xs' variant='light'>
                  Approve
                </Button>
                <Button color='red' size='xs' variant='light'>
                  Reject
                </Button>
              </Button.Group>
            </Group>
          )}
          {proposal.status === 'approved' && (
            <Text color='green' fw={500}>
              Approved{' '}
              <Text
                span
                fw={400}
                c={theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[6]}
              >
                by {proposal.resolvedBy}
              </Text>
            </Text>
          )}
          {proposal.status === 'rejected' && (
            <Text color='red' fw={500}>
              Rejected{' '}
              <Text
                span
                fw={400}
                c={theme.colorScheme === 'dark' ? theme.colors.gray[6] : theme.colors.gray[6]}
              >
                by {proposal.resolvedBy}
              </Text>
            </Text>
          )}
        </Group>
      </Group>
      <Text>{proposal.description}</Text>
    </Paper>
  )
}
