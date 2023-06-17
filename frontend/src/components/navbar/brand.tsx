import { Group, ActionIcon, useMantineColorScheme, Box, rem, Text, createStyles } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
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
  return (
    <Box className={classes.box}>
      <Group position="apart">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Group>
            <Logo colorScheme={colorScheme} />
            <Text className={classes.logoText} td="none">KMS</Text>
          </Group>
        </NavLink>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <Sun size="1rem" /> : <MoonStars size="1rem" />}
        </ActionIcon>
      </Group>
    </Box>
  );
}