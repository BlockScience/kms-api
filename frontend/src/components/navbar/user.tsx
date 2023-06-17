import { Settings } from 'tabler-icons-react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export function User() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
      }}
    >
      <NavLink to="/settings" style={{ textDecoration: 'none' }}>
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          }}
        >
          <Group>
            <Avatar
              src="https://www.gateworld.net/wiki/images/7/77/Jacksondaniel.jpg"
              radius="xl"
            />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                Daniel Jackson
              </Text>
              <Text color="dimmed" size="xs">
                Daniel@sgc.gov
              </Text>
            </Box>
            <Settings size={rem(18)} />
          </Group>
        </UnstyledButton>
      </NavLink>
    </Box>
  );
}