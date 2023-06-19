import {
  createStyles,
  Container,
  Title,
  Text,
  ThemeIcon,
  rem,
  SimpleGrid,
} from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
} from '@tabler/icons-react';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description:
      'Although it still can’t fly, its jumping power is outstanding, in Alola the mushrooms on Paras don’t grow up quite right',
  },
  {
    icon: IconMessage2,
    title: '24/7 Support',
    description:
      'Rapidash usually can be seen casually cantering in the fields and plains, Skitty is known to chase around after its own tail',
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(26),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export default function HomeArchitectureSection() {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));
  const { classes } = useStyles();
  return (
    <Container>
      <Title className={classes.title}>System Design</Title>
      <Text color='dimmed' mt='md' maw={rem(600)}>
        KMS is designed as part of a broader Knowledge Organisation
        Infrastructure. In contrast to a software product, success for KMS means
        eventually melting away into the improved infrastructure of the future.
      </Text>
      <Container className={classes.wrapper}>
        <SimpleGrid
          mt={0}
          cols={3}
          spacing={50}
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'xl' },
            { maxWidth: 755, cols: 1, spacing: 'xl' },
          ]}
        >
          {features}
        </SimpleGrid>
      </Container>
    </Container>
  );
}

interface FeatureProps {
  icon: React.FC<auny>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant='light' size={40} radius={40}>
        <Icon size='1.1rem' stroke={1.5} />
      </ThemeIcon>
      <Text mt='sm' mb={7}>
        {title}
      </Text>
      <Text size='sm' color='dimmed' sx={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}
