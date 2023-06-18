import { IconFileText, IconBrandSlack, IconBrandGithub, } from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, createStyles } from '@mantine/core';

interface LinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const useStyles = createStyles((theme) => ({
  navText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
  hyperlink: {
    textDecoration: 'none',
  },
}));

function Link({ icon, label, href }: LinkProps) {
  const { classes } = useStyles();

  return (
    <a href={href} className={classes.hyperlink} target='_blank'>
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
          <ThemeIcon color='gray' variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm" className={classes.navText}>{label}</Text>
        </Group>
      </UnstyledButton>
    </a>
  );
}

const data = [
  { icon: <IconBrandSlack size="1rem" />, label: 'Slack', href: 'https://blockscienceteam.slack.com/archives/C029RATAVTJ' },
  { icon: <IconBrandGithub size="1rem" />, label: 'Github', href: 'https://github.com/blockScience/kms' },
  { icon: <IconFileText size="1rem" />, label: 'Documentation', href: 'https://blockscience.github.io/kms/' },
];

export function ExternalLinks() {
  const links = data.map((link) => <Link {...link} key={link.label} />);
  return <div id='tour-navExternal'>{links}</div>;
}