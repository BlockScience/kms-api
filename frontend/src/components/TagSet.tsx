import { Paper, Text, Group, Badge, rem } from '@mantine/core';
export default function TagSet(props: { label: string, data: string[] }) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Text size="xs" fw={700} color="dimmed" tt="uppercase">
          {props.label}
        </Text>
      </Group>
      <Group align="flex-end" spacing={rem(5)} mt={25}>
        {props.data.map((tag, i) => <Badge key={i} radius="sm">{tag}</Badge>)}
      </Group>
    </Paper>
  )
}
