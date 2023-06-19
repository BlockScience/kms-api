import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  createStyles,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  navText: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[0]
        : theme.colors.dark[8],
  },
}));

interface LinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  path?: string;
  href?: string;
}

const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function NavLink({ icon, color, label, path, href }: LinkProps) {
  const { classes } = useStyles();
  return (
    <ConditionalWrapper
      condition={path}
      wrapper={(children) => (
        <Link to={path} style={{ textDecoration: 'none' }}>
          {children}
        </Link>
      )}
    >
      <UnstyledButton
        component={href ? 'a' : 'button'}
        href={href}
        target={href ? '_blank' : ''}
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant='light'>
            {icon}
          </ThemeIcon>

          <Text size='sm' className={classes.navText}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </ConditionalWrapper>
  );
}
