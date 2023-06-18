import {
  IconLayoutDashboard,
  IconAlertCircle,
  IconMessages,
  IconBinaryTree2,
  IconNotification
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

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

function NavLink({ icon, color, label, path }: LinkProps) {
  const { classes } = useStyles();
  return (
    <Link to={path} style={{ textDecoration: 'none' }}>
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
    </Link>
  );
}

const data = [
  { icon: <IconLayoutDashboard size="1rem" />, color: 'blue', label: 'Dashboard', path: '/dashboard' },
  { icon: <IconAlertCircle size="1rem" />, color: 'teal', label: 'Proposals', path: '/proposals' },
  { icon: <IconBinaryTree2 size="1rem" />, color: 'violet', label: 'Schema', path: '/schema' },
  { icon: <IconNotification size="1rem" />, color: 'grape', label: 'Activity', path: '/activity' },
  { icon: <IconMessages size="1rem" />, color: 'pink', label: 'Chat', path: '/chat' },
];

export function NavLinks() {
  const links = data.map((link) => <NavLink {...link} key={link.label} />);
  return <div>{links}</div>;
}