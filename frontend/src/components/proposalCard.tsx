import { Paper, Text, Title, Divider, createStyles, Group, Button } from '@mantine/core';
import { currentColorScheme, theme } from '@/utilities/theme'

interface ProposalCardProps {
  title: string;
  description: string;
  author: string;
  operations: bigint;
  status: string;
  resolvedBy: string | null;
}

const useStyles = createStyles((theme) => ({
  paper: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  }
}));

export function ProposalCard(proposal: ProposalCardProps) {
  const { classes } = useStyles();
  const { colors } = theme();
  return (
    <Paper shadow="sm" p="lg" withBorder className={classes.paper}>
      <Group position="apart">
        <Group>
          <Title order={5}>{proposal.title}</Title>
          <Text size='sm' c="dimmed">{proposal.author}</Text>
        </Group>
        <Group>
          {proposal.status === 'pending' &&
            <Group>
              <Text size='sm' c="dimmed">{proposal.operations.toString()} operations pending</Text>
              <Button.Group>
                <Button color="green" variant="light">Approve</Button>
                <Button color="red" variant="light">Reject</Button>
              </Button.Group>
            </Group>
          }
          {proposal.status === 'approved' &&
            <Text color='green'>
              Approved <Text span c={currentColorScheme() === 'dark' ? colors.gray[6] : colors.gray[6]}>by {proposal.resolvedBy}</Text>
            </Text>
          }
          {proposal.status === 'rejected' &&
            <Text color='red'>
              Rejected <Text span c={currentColorScheme() === 'dark' ? colors.gray[6] : colors.gray[6]}>by {proposal.resolvedBy}</Text>
            </Text>
          }
        </Group>
      </Group>
      <Divider my="sm" />
      <Text>
        {proposal.description}
      </Text>
    </Paper>
  )
}