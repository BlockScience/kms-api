import { useEffect } from 'preact/hooks'
import { useApi } from '@/hooks'
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom'

import { IconSearch } from '@tabler/icons-react'
import { CardsSkeleton } from '@/components/Skeleton'
import { Anchor, Center, Container, Pagination, Text, TextInput } from '@mantine/core'
import { Layout } from '@/components/Layout'
import { KObjectCards } from './KObjectCard'

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

export interface SearchHit {
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

export interface KObjectProps {
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

export default function Search() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchparams] = useSearchParams()
  const currentQuery = searchparams.get('q')
  const { result, error, loading, update } = useApi('/objects/query', {
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
    <Layout.Simple title='Search'>
      <form onSubmit={handleSearchSubmit}>
        <TextInput name='query' placeholder={currentQuery} icon={<IconSearch />} />
      </form>
      {
        <Text size='sm' align='center'>
          {(loading ? 'waiting for results' : result && searchSummaryString(result)) ||
            'no results to show'}
        </Text>
      }
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
    </Layout.Simple>
  )
}
