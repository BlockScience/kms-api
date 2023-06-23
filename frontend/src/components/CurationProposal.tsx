import { Paper, Text, Title, Group, Button } from '@mantine/core'
import { currentColorScheme, useTheme } from '@/utilities/theme'

interface ProposalProps {
  title: string
  description: string
  author: string
  operations: bigint
  status: string
  resolvedBy: string | null
}

export function CurationProposal(proposal: ProposalProps) {
  const { colors } = useTheme()
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
                c={currentColorScheme() === 'dark' ? colors.gray[6] : colors.gray[6]}
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
                c={currentColorScheme() === 'dark' ? colors.gray[6] : colors.gray[6]}
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
