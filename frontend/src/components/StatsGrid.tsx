import { createStyles, Group, Paper, SimpleGrid, Text, rem } from '@mantine/core';
import {
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  value: {
    fontSize: rem(24),
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

interface StatsGridProps {
  data: { title: string; value: string; diff: number }[];
}

export default function StatsGrid({ data }: StatsGridProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text color={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke='1.5' />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
