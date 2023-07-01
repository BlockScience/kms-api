import ObjectRID from '@/components/ObjectRID'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import {
  Anchor,
  Badge,
  Container,
  Divider,
  Group,
  MantineTheme,
  Pagination,
  Paper,
  Popover,
  SegmentedControl,
  Space,
  Stack,
  Text,
  Title,
  px,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { IconCheck, IconMinus, IconX } from '@tabler/icons-react'
import { useSearchParams } from 'react-router-dom'

interface SearchResultProps {
  title: string
  text: string
  url: string
  type: string
  platform: string
  tags: string[]
  theme: MantineTheme
}

interface FilterProps {
  label: string
  data: string[]
  noFilters?: boolean
}

function SearchResult(props: SearchResultProps) {
  const bg =
    props.theme.colorScheme === 'dark' ? props.theme.colors.dark[6] : props.theme.colors.gray[0]
  return (
    <Paper bg={bg} p='sm' radius='md'>
      <Group position='apart'>
        <Title order={5}>
          <Anchor color='inherit' target='_blank' href={props.url}>
            {props.title}
          </Anchor>
        </Title>
        <ObjectRID id={props.text} />
      </Group>
      <Text c='dimmed' fz='sm'>
        {props.type} from {props.platform}
      </Text>
      <Text>{props.text}</Text>
    </Paper>
  )
}

function FilterState() {
  return (
    <SegmentedControl
      size='xs'
      defaultValue='ignore'
      transitionDuration={0}
      data={[
        {
          label: <IconCheck size={px('1rem')} />,
          value: 'include',
        },
        { label: <IconMinus size={px('1rem')} />, value: 'ignore' },
        { label: <IconX size={px('1rem')} />, value: 'exclude' },
      ]}
    />
  )
}

function FilterDropdown(props: FilterProps) {
  return (
    <Popover width={300} position='bottom' withArrow shadow='md' arrowSize={20}>
      <Popover.Target>
        <Badge
          variant={props.noFilters ? 'outline' : 'filled'}
          component='a'
          size='sm'
          radius={5}
          style={{ cursor: 'pointer' }}
        >
          {props.label}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing='xs'>
          <Group>
            <FilterState />
            <Text tt='uppercase' size='xs'>
              all
            </Text>
          </Group>
          <Divider />
          {props.data.map((s: string) => (
            <Group key={s}>
              <FilterState />
              <Text size='xs' tt='uppercase'>
                {s}
              </Text>
            </Group>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}

export default function Search() {
  const theme = useMantineTheme();
  const [searchparams] = useSearchParams();
  const query = searchparams.get('q');

  const { result, error, setData, refresh } = useApi('/object/query', {
    // defer: true,
    method: 'POST',
    data: {
      "q": "kms",
      "query_by": "tags, title, text",
      "query_by_weights": "3, 2, 1",
      "sort_by": "rank:desc,_text_match:desc",
      "highlight_full_fields": "title, tags",
      "highlight_affix_num_tokens": 20
    }
  })

  const searchresults = result && result.hits.map(search => {
    return (<SearchResult
      title={search.document.title}
      url={search.document.url}
      theme={theme}
      type='document'
      platform={search.document.platform}
      tags={search.document.tags}
      text={search.highlight.text.snippet}
    />)
  });

  console.log(result);


  return (
    <div>
      <SetTitle text='Search' />
      <Stack maw={1000} mx='auto' mt={30}>
        <Group spacing={rem(5)}>
          <Text size='xs' fw={700} color='dimmed' tt='uppercase'>
            Query
          </Text>
          <Badge variant='light' color='gray' radius='sm'>
            {query}
          </Badge>
          <Space w='md' />
          <Text size='xs' fw={700} color='dimmed' tt='uppercase'>
            Filters
          </Text>
          <Badge variant='light' color='gray' radius='sm'>
            19
          </Badge>
        </Group>
        <Group spacing='xs'>
          <FilterDropdown
            label='Tags (5)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Platform (2)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Type (0)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='URL (5)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Rank (2)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Tags (5)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Platform (2)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Type (0)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='URL (5)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Rank (2)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Tags (5)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Platform (2)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Type (0)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='URL (5)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Rank (2)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Tags (5)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Platform (2)'
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Type (0)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='URL (5)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
          <FilterDropdown
            label='Rank (2)'
            noFilters
            data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
          />
        </Group>
        <Divider label={result && `showing ${result.hits.length}/${result.found} results`} labelPosition='center' />
        {searchresults}
        <Container>
          <Pagination total={10} />
        </Container>
      </Stack>
    </div>
  )
}
