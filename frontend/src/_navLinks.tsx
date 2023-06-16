import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Schema,
} from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, createStyles } from '@mantine/core';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path: string;
}

const useStyles = createStyles((theme) => ({
  navText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
}));

function Link({ icon, color, label, path }: LinkProps) {
  const { classes } = useStyles();
  return (
    <NavLink to={path} style={{ textDecoration: 'none' }}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm" className={classes.navText}>{label}</Text>
        </Group>
      </UnstyledButton>
    </NavLink>
  );
}

const data = [
  { icon: <GitPullRequest size="1rem" />, color: 'blue', label: 'Console', path: '/console' },
  { icon: <AlertCircle size="1rem" />, color: 'teal', label: 'Proposals', path: '/proposals' },
  { icon: <Schema size="1rem" />, color: 'grape', label: 'Schema', path: '/schema' },
  { icon: <Messages size="1rem" />, color: 'violet', label: 'Notifications', path: '/notifications' },
];

export function NavLinks() {
  const links = data.map((link) => <Link {...link} key={link.label} />);
  return <div>{links}</div>;
}