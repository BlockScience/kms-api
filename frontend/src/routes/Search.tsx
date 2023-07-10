import { useEffect, useState } from 'preact/hooks'
import { useApi } from '@/hooks'
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'

import { IconSearch } from '@tabler/icons-react'
import { CardsSkeleton } from '@/components/Skeleton'
import { Anchor, Container, Title, Pagination, Text, TextInput, Stack } from '@mantine/core'
import { Layout } from '@/components/Layout'
import { KObjectCards } from './KObjectCard'
import { useLocalStorage } from '@mantine/hooks'

// -------- CONSTANTS -------- //
const SHOW_RECENT_SEARCHES = 5
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

type SearchResultState = 'loading' | 'error' | 'results' | 'none'

// ----------- HELPERS ----------- //
const createSearchSummary = (response: TypesenseResponse) => {
  const totalResults = response.found
  const resultsPerPage = response.request_params.per_page
  const currentPage = response.page || 1
  const end = Math.min(currentPage * resultsPerPage, totalResults)
  const start = Math.min(Math.max(0, currentPage - 1) * resultsPerPage + 1, end)
  return `showing ${start}-${end} of ${totalResults} results`
}

export default function Search() {
  const navigate = useNavigate()
  const currentQuery = useSearchParams()[0].get('q')
  const [searchState, setSearchState] = useState<SearchResultState>('none')
  const [recentQueries, setRecentQueries] = useLocalStorage<string[]>({
    key: 'recentQueries',
    defaultValue: [],
  })

  const { result, error, loading, update } = useApi('/objects/query', {
    method: 'POST',
    defer: currentQuery === null,
    data: {
      ...QUERY_DEFAULTS,
      q: currentQuery,
    },
  })

  // Set search result state
  useEffect(() => {
    if (loading) setSearchState('loading')
    else if (result) {
      if (result.found === 0) setSearchState('none')
      else setSearchState('results')
    }
    if (error) setSearchState('error')
  }, [loading, error, result])

  useEffect(() => {
    if (currentQuery === null) return
    update({
      ...QUERY_DEFAULTS,
      q: currentQuery,
    })
    setRecentQueries((prev) => {
      const repeatedSearch = prev.indexOf(currentQuery)
      if (repeatedSearch >= 0) prev.splice(repeatedSearch, 1)
      return [...prev, currentQuery].slice(-SHOW_RECENT_SEARCHES)
    })
  }, [currentQuery])

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

  // Components
  const RecentSearches = () => {
    if (recentQueries.length === 0) return <></>
    return (
      <>
        <Title align='center' order={2}>
          Recent Searches
        </Title>
        <Stack spacing={0} align='center'>
          {recentQueries.reverse().map((query, i) => (
            <Anchor
              key={i}
              onClick={() =>
                updateSearch({
                  ...QUERY_DEFAULTS,
                  q: query,
                })
              }
            >
              {query}
            </Anchor>
          ))}
        </Stack>
      </>
    )
  }

  const Results = () => {
    switch (searchState) {
      case 'loading':
        return RESULT_LOADING
      case 'results':
        return <KObjectCards hits={result.hits} />
      case 'none':
        return <RecentSearches />
      default:
        throw new Error('Invalid search result state')
    }
  }

  const Paginate = () => {
    switch (searchState) {
      case 'results':
      case 'loading':
        return (
          <Container>
            <Pagination
              total={Math.ceil(result.found / result.request_params.per_page)}
              value={result.page}
              disabled={loading}
              onChange={handlePaginationChange}
            />
          </Container>
        )
    }
    return null
  }

  const SearchInput = () => (
    <form onSubmit={handleSearchSubmit}>
      <TextInput name='query' placeholder={currentQuery} icon={<IconSearch />} />
    </form>
  )

  const SearchStatus = () => {
    let status = ''
    switch (searchState) {
      case 'error':
        status = 'Something went wrong'
        break
      case 'loading':
        status = 'Searching...'
        break
      case 'none':
        status = 'No results found'
        break
      case 'results':
        status = createSearchSummary(result)
    }
    return (
      <Text size='sm' align='center'>
        {status}
      </Text>
    )
  }

  return (
    <Layout.Simple title='Search'>
      <SearchInput />
      <SearchStatus />
      <Results />
      <Paginate />
    </Layout.Simple>
  )
}
