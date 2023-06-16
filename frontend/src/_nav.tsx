import { Navbar, Box, Space, Group, Stack, Badge } from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import { Brand } from './_brand';
import { NavLinks } from './_navLinks';
import { User } from './_user';
import { TextInput } from '@mantine/core';
import { Search } from 'tabler-icons-react';

export function Nav() {
  const spotlight = useSpotlight();
  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Brand />
      </Navbar.Section>
      <Navbar.Section grow mx="-xs" px="xs">
        <Box py="md">
          <TextInput onClick={() => spotlight.openSpotlight()} placeholder="Search" icon={<Search size="1rem" />} rightSection={<Badge color="dark" size="sm" radius="xs" variant="filled">/</Badge>} />
          <Space h="xs" />
          <NavLinks />
        </Box>
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  );
}