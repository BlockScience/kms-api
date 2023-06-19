import { IconLogout } from '@tabler/icons-react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  createStyles,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navText: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.dark[8],
  },
}));

interface LogoutProps {
  color: string;
  label: string;
}

export default function Logout({ color, label }: LogoutProps) {
  const { classes } = useStyles();
  const { logout } = useAuth0();
  return (
    <UnstyledButton
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.fn.rgba(
            theme.fn.darken(theme.fn.themeColor(color), 0.2),
            0.1,
          ),
        },
      })}
    >
      <Group>
        <ThemeIcon color='gray' variant='light'>
          <IconLogout size='1rem' />
        </ThemeIcon>
        <Text size='sm' className={classes.navText}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
}
