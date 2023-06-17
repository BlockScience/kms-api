import { Brand } from '@/components/navbar/brand';
import { ExternalLinks } from '@/components/navbar/linksExternal';
import { NavLinks } from '@/components/navbar/linksNavigation';
import { User } from '@/components/navbar/user';
import { currentColorScheme } from '@/utilities/theme';
import { Badge, Box, Navbar, Space, TextInput, createStyles } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import { BaseSyntheticEvent } from 'react';
import { Search } from 'tabler-icons-react';


const navStyles = createStyles((theme) => ({
  navText: {
    marginBottom: theme.spacing.xs
  },
  searchInputShortcut: {
    color: currentColorScheme() === 'dark' ? theme.colors.gray[1] : theme.colors.gray[7],
    backgroundColor: currentColorScheme() === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
  }
}));


export function Nav() {
  const spotlight = useSpotlight();
  const onSelectSearchInput = (e: BaseSyntheticEvent) => {
    e.target.blur();
    spotlight.openSpotlight()
  }
  const { classes } = navStyles();
  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mx="-xs" px="xs">
        <Box py="md">
          <TextInput onMouseDown={onSelectSearchInput} placeholder="Search" icon={<Search size="1rem" />} rightSection={<Badge size="sm" radius="xs" variant="filled" className={classes.searchInputShortcut} >/</Badge>} />
          <Space h="xs" />
          <NavLinks />
        </Box>
      </Navbar.Section>
      <Navbar.Section className={classes.navText}>
        <ExternalLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar >
  );
}