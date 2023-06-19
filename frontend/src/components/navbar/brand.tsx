import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  rem,
  Text,
  createStyles,
  Center,
} from '@mantine/core';
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import LogoLight from '@/assets/logoLight';
import LogoDark from '@/assets/logoDark';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = createStyles((theme) => ({
  logoText: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.dark[8],
    fontSize: theme.fontSizes.xl,
    fontWeight: 700,
  },
  box: {
    paddingLeft: theme.spacing.xs,
    paddingRight: theme.spacing.xs,
    paddingBottom: theme.spacing.lg,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
}));

export function Brand() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const { isAuthenticated, logout } = useAuth0();
  const kmsVersion = 1.1;
  return (
    <Box className={classes.box}>
      <Group position='apart'>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Group>
            {colorScheme === 'dark' ? <LogoLight /> : <LogoDark />}
            <Text className={classes.logoText} td='none'>
              KMS{' '}
              <Center inline>
                <Text span inherit fz='sm' c='dimmed'>
                  v{kmsVersion}
                </Text>
              </Center>
            </Text>
          </Group>
        </NavLink>
        <Group spacing='xs'>
          <ActionIcon
            id='tour-toggleDarkmode'
            variant='default'
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? (
              <IconSun size='1rem' />
            ) : (
              <IconMoonStars size='1rem' />
            )}
          </ActionIcon>
          {isAuthenticated ? (
            <ActionIcon
              variant='default'
              size={30}
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <IconLogout size='1rem' />
            </ActionIcon>
          ) : (
            <></>
          )}
        </Group>
      </Group>
    </Box>
  );
}
