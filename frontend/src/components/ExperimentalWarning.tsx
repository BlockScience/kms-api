import { Group, Paper, Text, px } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'

export const ExperimentalWarning = () => (
  <Paper p='xs' radius='sm' withBorder shadow='sm'>
    <Group spacing={5}>
      <IconAlertCircle size={px('1.2rem')} stroke={1.8} />
      <Text size='xs'>This feature is experimental</Text>
    </Group>
  </Paper>
)
