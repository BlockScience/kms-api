import { useEffect } from 'preact/hooks'
import { useApi } from '@/hooks/useApi'
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { SetTitle } from '@/utils'
import parseHtml from '@/utils/htmlParser'

import { IconSearch } from '@tabler/icons-react'
import { CardsSkeleton } from '@/components/Skeleton'
import ObjectRID from '@/components/ObjectRID'
import {
  Anchor,
  Center,
  Container,
  Divider,
  Group,
  Pagination,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'

// -------- CONSTANTS -------- //
const QUERY_DEFAULTS = {
  query_by: 'tags, title, text',
  query_by_weights: '3, 2, 1',
  sort_by: 'rank:desc,_text_match:desc',
  highlight_fields: 'tags, title, text',
  highlight_full_fields: 'title, tags',
  highlight_affix_num_tokens: 20,
  exclude_fields: 'text',
}

const RESULT_LOADING = <>{CardsSkeleton([100, 120, 80, 100, 130, 150, 100])}</>
const RESULT_ERROR = (
  <Center>
    <Text>
      Something went wrong. If the issue persists please <Anchor>file a bug report.</Anchor>
    </Text>
  </Center>
)

const RESULT_NONE = (
  <Center>
    <Text>No results found</Text>
  </Center>
)

// -------- INTERFACES -------- //
interface TypesenseQuery {
  q: string
  [key: string]: any
}

interface TypesenseResponse {
  found: number
  hits: SearchHit[]
  page: number
  request_params: {
    per_page: number
  }
}

interface SearchHit {
  document: Document
  highlight: {
    text?: {
      snippet?: string
    }
  }
}

interface Document {
  id: string
  title: string
  url: string
  type: string
  platform: string
  tags: string[]
}

interface KObjectProps {
  title: string
  url: string
  type: string
  platform: string
  tags: string[]
  id: string
  text: string | JSX.Element
}

// ----------- HELPERS ----------- //
const searchSummaryString = (response: TypesenseResponse) => {
  const totalResults = response.found
  const resultsPerPage = response.request_params.per_page
  const currentPage = response.page || 1
  const end = Math.min(currentPage * resultsPerPage, totalResults)
  const start = Math.min(Math.max(0, currentPage - 1) * resultsPerPage + 1, end)
  return `showing ${start}-${end} of ${totalResults} results`
}

// -------- SUBCOMPONENTS -------- //
function KObjectCard({ title, text, url, type, platform, tags, id }: KObjectProps) {
  const theme = useMantineTheme()
  const bg = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
  return (
    <Paper bg={bg} p='sm' radius='md' withBorder>
      <Group position='apart' noWrap align='start'>
        <Title order={5}>
          <Anchor color='inherit' target='_blank' href={url}>
            {title}
          </Anchor>
        </Title>
        <ObjectRID id={id} />
      </Group>
      <Text c='dimmed' fz='sm'>
        {type} from {platform}
      </Text>
      <Text>{text}</Text>
    </Paper>
  )
}

const KObjectCards = ({ hits }: { hits: SearchHit[] }): JSX.Element => {
  const cards = hits.map((hit) => (
    <KObjectCard
      key={hit.document.id}
      id={hit.document.id}
      title={hit.document.title}
      url={hit.document.url}
      type={hit.document.type}
      platform={hit.document.platform}
      tags={hit.document.tags}
      text={parseHtml(hit.highlight.text?.snippet)}
    />
  ))
  return <>{cards}</>
}

export default function Search() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchparams] = useSearchParams()
  const currentQuery = searchparams.get('q')
  const { result, error, loading, update } = useApi('/object/query', {
    method: 'POST',
    data: {
      ...QUERY_DEFAULTS,
      q: currentQuery,
    },
  })

  useEffect(() => {
    update({
      ...QUERY_DEFAULTS,
      q: currentQuery,
    })
  }, [search])

  const updateSearch = (typesenseQuery: TypesenseQuery) => {
    if (!typesenseQuery.q) throw new Error('updateSearch must be called with a q parameter')
    update(typesenseQuery)
    navigate(
      {
        pathname: '/search',
        search: createSearchParams({
          q: typesenseQuery.q,
        }).toString(),
      },
      { replace: true },
    )
  }

  const ConditionalResults = (): JSX.Element => {
    if (loading) return RESULT_LOADING
    if (error) return RESULT_ERROR
    if (result) {
      if (result.found === 0) return RESULT_NONE
      if (result.hits) return <KObjectCards hits={result.hits} />
    }
    return null
  }

  // Handlers
  const handleSearchSubmit = (e: Event) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault()
      updateSearch({
        ...QUERY_DEFAULTS,
        q: e.target.query.value,
      })
    } else throw new Error('handleSearchSubmit must be called with an HTMLFormElement')
  }

  const handlePaginationChange = (newPage: number): void => {
    updateSearch({ ...QUERY_DEFAULTS, q: currentQuery, page: newPage })
  }

  return (
    <div>
      <SetTitle text='Search' />
      <Stack maw={1000} mx='auto' mt={30}>
        <form onSubmit={handleSearchSubmit}>
          <TextInput name='query' placeholder={currentQuery} icon={<IconSearch />} />
        </form>
        <Divider
          label={loading ? 'waiting for results' : result && searchSummaryString(result)}
          labelPosition='center'
        />
        <ConditionalResults />
        <Container>
          {result && (
            <Pagination
              total={Math.ceil(result.found / result.request_params.per_page)}
              value={result.page}
              disabled={loading}
              onChange={handlePaginationChange}
            />
          )}
        </Container>
      </Stack>
    </div>
  )
}
