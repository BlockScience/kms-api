import { SetTitle } from "@/utilities/metadata";
import { Pagination, Stack, Paper, Container, Title, Text, Anchor, Group, ScrollArea, MantineTheme, Popover, Divider, rem, Button, SegmentedControl, Grid } from "@mantine/core";
import { PropsWithChildren } from "react";
import { useMantineTheme } from '@mantine/core';
import { IconX, IconCheck, IconMinus } from '@tabler/icons-react';

interface SearchResultProps {
  title: string,
  text: string,
  url: string,
  type: string,
  platform: string,
  tags: string[],
  theme: MantineTheme
}

interface FilterProps {
  label: string,
  data: string[],
  noFilters?: boolean
}

function SearchResult(props: PropsWithChildren<SearchResultProps>) {
  const bg = props.theme.colorScheme === 'dark' ? props.theme.colors.dark[6] : props.theme.colors.gray[0];
  return (
    <Paper bg={bg} p='md' radius="md">
      <Title order={5}><Anchor target="_blank" href={props.url} >{props.title}</Anchor></Title>
      <Text c="dimmed" fz="sm">{props.type} from {props.platform}</Text>
      <Text>{props.text}</Text>
    </Paper>
  )
}

function FilterState() {
  return (
    <SegmentedControl size="xs" defaultValue="ignore" transitionDuration={0}
      data={[
        { label: <IconCheck size={rem(15)} />, value: 'include' },
        { label: <IconMinus size={rem(15)} />, value: 'ignore' },
        { label: <IconX size={rem(15)} />, value: 'exclude' },
      ]}
    />
  )
}

function FilterDropdown(props: FilterProps) {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md" arrowSize={20}>
      <Popover.Target>
        <Button variant={props.noFilters ? "default" : "filled"} size="xs">{props.label}</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing='xs'>
          <Group >
            <FilterState /><Text tt="uppercase" fz="sm">all</Text>
          </Group>
          <Divider />
          {props.data.map((s: string) => (
            <Group >
              <FilterState /><Text tt="uppercase" fz="sm">{s}</Text>
            </Group>
          ))}
          <Divider />
          <Group spacing='apart' position="right">
          </Group>
        </Stack>
        <Button>Apply</Button>
      </Popover.Dropdown>
    </Popover>

  );
}

export default function Search() {
  const theme = useMantineTheme();
  return (
    <div>
      <SetTitle text='Search' />
      <Stack maw={1000} mx='auto' mt={30}>
        <Group spacing='xs'>
          <FilterDropdown label="Tags (5)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Platform (2)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Type (0)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="URL (5)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Rank (2)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Tags (5)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Platform (2)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Type (0)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="URL (5)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Rank (2)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Tags (5)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Platform (2)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Type (0)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="URL (5)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Rank (2)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Tags (5)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Platform (2)" data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Type (0)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="URL (5)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
          <FilterDropdown label="Rank (2)" noFilters data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']} />
        </Group>
        <Divider label="showing 20/231 results" labelPosition="center" />

        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <Container>
          <Pagination total={10} />
        </Container>
      </Stack>
    </div>
  );
}