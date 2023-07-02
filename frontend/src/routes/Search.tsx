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
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom'
import { Parser, ProcessNodeDefinitions } from 'html-to-react'
import { notifications } from '@mantine/notifications'
import { CardsSkeleton } from '@/components/Skeleton'

// TODO: use this to fix parsing bug thats breaking some search pages
const textToHtmlRules = [
  {
    shouldProcessNode: function (node) {
      return node.type === 'mark'
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

const queryDefaults = {
  query_by: 'tags, title, text',
  query_by_weights: '3, 2, 1',
  sort_by: 'rank:desc,_text_match:desc',
  highlight_fields: 'tags, title, text',
  highlight_full_fields: 'title, tags',
  highlight_affix_num_tokens: 20,
  exclude_fields: 'text',
}

interface SearchResultProps {
  title: string
  text: string
  url: string
  type: string
  platform: string
  tags: string[]
  id: string
}
function SearchResult({ title, text, url, type, platform, tags, id }: SearchResultProps) {
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

export default function Search() {
  const [searchparams] = useSearchParams()
  const currentQuery = searchparams.get('q')
  const navigate = useNavigate()

  const { result, error, loading, update } = useApi('/object/query', {
    method: 'POST',
    data: {
      ...queryDefaults,
      q: currentQuery,
    },
  })

  console.log(result)

  const updateSearch = (options: object) => {
    if (!options.q) throw new Error('updateSearch must be called with a q parameter')
    update(options)
    navigate(
      {
        pathname: '/search',
        search: createSearchParams({
          q: options.q,
        }).toString(),
      },
      { replace: true },
    )
  }

  const handleSearchSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    updateSearch({
      ...queryDefaults,
      q: e.target.query.value,
    })
  }

  const mapSearchHits = (hits: object[]): JSX.Element[] => {
    return hits.map((hit, i) => {
      const doc = hit.document

      console.log(
        'parser...',
        Parser().parseWithInstructions(
          hit.highlight.text?.snippet || '',
          () => true,
          textToHtmlRules,
        ),
      )

      return (
        <SearchResult
          key={i}
          id={doc.id}
          title={doc.title}
          url={doc.url}
          type={doc.type}
          platform={doc.platform}
          tags={doc.tags}
          text={Parser().parseWithInstructions(
            hit.highlight.text?.snippet || '',
            () => true,
            textToHtmlRules,
          )}
        />
      )
    })
  }

  const formatSearchSummary = (result: object) => {
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

  const FormattedResults = () => {
    if (error) return 'ERROR :('
    if (loading) return CardsSkeleton([100, 120, 80, 100, 130, 150, 100])
    console.log('loading', loading)

    if (result) {
      if (result.hits) {
        return mapSearchHits(result.hits)
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

  return (
    <div>
      <SetTitle text='Search' />
      <Stack maw={1000} mx='auto' mt={30}>
        <form onSubmit={handleSearchSubmit}>
          <TextInput name='query' placeholder={currentQuery} icon={<IconSearch />} />
        </form>
        <Divider
          label={loading ? 'Waiting for results' : result && formatSearchSummary(result)}
          labelPosition='center'
        />
        {FormattedResults()}
        <Container>
          {result && (
            <Pagination
              total={Math.ceil(result.found / result.request_params.per_page)}
              value={result.page}
              disabled={loading}
              onChange={(newPage) => {
                updateSearch({ ...queryDefaults, q: currentQuery, page: newPage })
              }}
            />
          )}
        </Container>
      </Stack>
    </div>
  )
}
