import { SetTitle } from '@/utils'
import { Box, Button, Text, Stack, TextInput, Textarea } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { Prism } from '@mantine/prism'
import { useEffect, useState } from 'preact/hooks'
import { parser } from '@/utils/parser'
import { useApi } from '@/hooks/useApi'

export default function QueryTest() {
  const [parserResponse, setParserResponse] = useState('Parser response')
  const [parseError, setParseError] = useState(false)
  // const [typesenseResponse, setTypesenseResponse] = useState('')
  const [shouldPassTests, setShouldPassTests] = useState([])
  const [shouldFailTests, setShouldFailTests] = useState([])
  const { result, error, setData, refresh } = useApi('/object/query', {
    defer: true,
    method: 'POST',
  })

  // console.log(result)
  // console.log(error)

  const handleInputChange = (e) => {
    try {
      setParserResponse(JSON.stringify(parser.parse(e.target.value), null, 2))
      setParseError(false)
    } catch (e) {
      if (e.name === 'SyntaxError') {
        setParseError(true)
        setParserResponse(e.message)
      }
    }
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.filterString.value)
    setData({ q: '*', filter_by: e.target.filterString.value })
    refresh()
  }

  const handleTestSubmit = (e) => {
    e.preventDefault()
    setShouldPassTests(
      JSON.parse(e.target.shouldPass.value).map((x) => {
        try {
          parser.parse(x)
          return '✅'
        } catch (e) {
          if (e.name === 'SyntaxError') {
            return e.message
          }
        }
      }),
    )
  }

  return (
    <div>
      <SetTitle text='Query Tests' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Query Tests</PageTitle>
        <Stack>
          {/* PARSER INPUT */}
          <form onSubmit={handleInputSubmit}>
            <TextInput name='filterString' onInput={handleInputChange} placeholder='filter_by' />
            <Button type='submit' mt='sm'>
              Submit to Typesense
            </Button>
          </form>
          <Prism withLineNumbers language='json'>
            {JSON.stringify(result || error, null, 2) || ''}
          </Prism>

          {/* TESTS */}
          <form onSubmit={handleTestSubmit}>
            <Textarea name='shouldPass' label='Valid filter strings' />
            {shouldPassTests && (
              <Prism withLineNumbers language='json'>
                {shouldPassTests.join('\n')}
              </Prism>
            )}
            <Textarea name='shouldFail' label='Invalid filter strings' />
            <Button mt='sm' type='submit'>
              {shouldFailTests && (
                <Prism withLineNumbers language='json'>
                  {shouldFailTests.join('\n')}
                </Prism>
              )}
              Test
            </Button>
          </form>
          {result && (
            <Prism withLineNumbers language='json'>
              {result}
            </Prism>
          )}
          <Prism
            withLineNumbers
            language='json'
            highlightLines={
              parseError
                ? {
                    1: { color: 'red' },
                  }
                : undefined
            }
          >
            {parserResponse}
          </Prism>
        </Stack>
      </Box>
    </div>
  )
}
