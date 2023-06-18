import { SetTitle } from "@/utilities/metadata";
import { Pagination, Stack, Paper, Container, Title, Text, Anchor, Group, CopyButton, Tooltip, MantineTheme, Popover, Divider, rem, ActionIcon, SegmentedControl, Grid, Badge, Space } from "@mantine/core";
import { PropsWithChildren } from "react";
import { useMantineTheme } from '@mantine/core';
import { IconX, IconCheck, IconMinus, IconCopy } from '@tabler/icons-react';
import { Md5 } from 'ts-md5';

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
  const hash = Md5.hashStr(props.text);
  return (
    <Paper bg={bg} p='sm' radius="md">
      <Group position="apart">
        <Title order={5}><Anchor color="inherit" target="_blank" href={props.url} >{props.title}</Anchor></Title>
        <Popover position="left" withArrow shadow="md" arrowSize={15}>
          <Popover.Target>
            <Badge style={{ cursor: 'pointer' }} radius='sm'>{hash.slice(0, 7)}</Badge>
          </Popover.Target>
          <Popover.Dropdown p={5} pl={10} m='xs'>
            <Group>
              <Text tt="uppercase" color='dimmed' size="xs" fw={500}>Object: {hash}</Text>
              <CopyButton value={hash} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                    <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                      {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Popover.Dropdown>
        </Popover>
      </Group>
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
        <Badge variant={props.noFilters ? "outline" : "filled"} component="a" size="sm" radius={5} style={{ cursor: 'pointer' }}>{props.label}</Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing='xs'>
          <Group >
            <FilterState /><Text tt="uppercase" size="xs">all</Text>
          </Group>
          <Divider />
          {props.data.map((s: string) => (
            <Group >
              <FilterState /><Text size="xs" tt="uppercase" >{s}</Text>
            </Group>
          ))}
        </Stack>
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
        <Group spacing={rem(5)}>
          <Text size="xs" fw={700} color="dimmed" tt="uppercase">Query</Text>
          <Badge variant="light" color="gray" radius='sm'>cadCAD something foo foo</Badge>
          <Space w='md' />
          <Text size="xs" fw={700} color="dimmed" tt="uppercase">Filters</Text>
          <Badge variant="light" color="gray" radius='sm'>19</Badge>
        </Group>
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
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolosre magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doflore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolaore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doslore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolgore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloreee magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <SearchResult
          title='Some Artifact' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' theme={theme} type='video' platform="youtube.com" tags={[]} text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et folore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
        <Container>
          <Pagination total={10} />
        </Container>
      </Stack>
    </div>
  );
}