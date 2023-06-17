import { Helmet } from "react-helmet";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Image,
  rem,
  Center,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function NotFound() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Helmet>
        <title>KMS &gt; 404</title>
      </Helmet>
      <Center>
        <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
          <Image src='/404.svg' className={classes.mobileImage} />
          <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text color="dimmed" size="lg">
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <NavLink to="/">
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Get back to home page
              </Button>
            </NavLink>
          </div>
          <Image src='/404.svg' className={classes.desktopImage} />
        </SimpleGrid>
      </Center>
    </Container>
  );
}