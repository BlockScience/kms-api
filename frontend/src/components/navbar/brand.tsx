import { Group, ActionIcon, useMantineColorScheme, Box, rem, Text, createStyles, Center } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/navbar/logo';

const useStyles = createStyles((theme) => ({
  logoText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },
  box: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingBottom: theme.spacing.lg,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  }
}));

export function Brand() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const kmsVersion = 1.1;
  return (
    <Box className={classes.box}>
      <Group position="apart">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Group>
            <Logo colorScheme={colorScheme} />
            <Text className={classes.logoText} td="none">KMS <Center inline><Text span inherit fz="sm" c="dimmed">v{kmsVersion}</Text></Center></Text>
          </Group>
        </NavLink>
        <ActionIcon id="tour-toggleDarkmode" variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
        </ActionIcon>
      </Group>
    </Box>
  );
}