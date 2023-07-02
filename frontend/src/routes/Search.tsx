import ObjectRID from '@/components/ObjectRID'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import {
  Anchor,
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
import { IconSearch } from '@tabler/icons-react'
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom'
import { Parser, ProcessNodeDefinitions } from 'html-to-react'
import { notifications } from '@mantine/notifications'
import { CardsSkeleton } from '@/components/Skeleton'
import { useEffect } from 'preact/hooks'

// Define constants
const MARK_NODE_TYPE = 'mark'

const QUERY_DEFAULTS = {
  query_by: 'tags, title, text',
  query_by_weights: '3, 2, 1',
  sort_by: 'rank:desc,_text_match:desc',
  highlight_fields: 'tags, title, text',
  highlight_full_fields: 'title, tags',
  highlight_affix_num_tokens: 20,
  exclude_fields: 'text',
}

// TODO: use this to fix parsing bug thats breaking some search pages
const HTML_PARSER_RULES = [
  {
    shouldProcessNode: function (node) {
      return node.type === MARK_NODE_TYPE
    },
    processNode: function (node, children) {
      return node.data.toUpperCase()
    },
  },
  {
    // Anything else
    shouldProcessNode: function (node) {
      return true
    },
    processNode: ProcessNodeDefinitions().processDefaultNode,
  },
]

// Define interfaces
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
  text: string
  url: string
  type: string
  platform: string
  tags: string[]
  id: string
}

// Define helpers
const searchSummaryString = (result: TypesenseResponse) => {
  const totalResults = result.found
  const resultsPerPage = result.request_params.per_page
  const currentPage = result.page || 1

  // Calculate the range of results being shown
  let start = Math.max(0, currentPage - 1) * resultsPerPage + 1
  const end = Math.min(currentPage * resultsPerPage, totalResults)
  start = Math.min(start, end)

  // Create the string using template literals
  return `Showing ${start}-${end} of ${totalResults} results`
}

// Define subcomponents

function KObjectCard({ title, text, url, type, platform, tags, id }: KObjectProps) {
  const theme = useMantineTheme()
  const bg = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
  return (
    <Paper bg={bg} p='sm' radius='md' withBorder>
      <Group position='apart'>
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
      text={Parser().parseWithInstructions(
        hit.highlight.text?.snippet || '',
        () => true,
        HTML_PARSER_RULES,
      )}
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

  const FormattedResults = () => {
    if (error) return 'ERROR :('
    if (loading) return CardsSkeleton([100, 120, 80, 100, 130, 150, 100])

    if (result) {
      if (result.hits) {
        return <KObjectCards hits={result.hits} />
      } else {
        return 'no results'
      }
    } else
      notifications.show({
        title: 'Something went wrong during search',
        color: 'red',
        message: 'We did not know this would happen, which is why you\'re seeing this message...',
      })
    return
  }

  // Handlers
  const handleSearchSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    updateSearch({
      ...QUERY_DEFAULTS,
      q: e.target.query.value,
    })
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
          label={loading ? 'Waiting for results' : result && searchSummaryString(result)}
          labelPosition='center'
        />
        {FormattedResults()}
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
