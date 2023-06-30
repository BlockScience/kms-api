import { SetTitle } from '@/utils'
import { Box, Button, Group, Stack, TextInput, Textarea } from '@mantine/core'
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
  const { result, setData, refresh } = useApi('/typesense_endpoint', {
    defer: true,
    method: 'POST',
  })

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
    setData({ filters_or_whatever_the_endpoint_expects: e.target.value })
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
    console.log(e.target.shouldPass.value)
    console.log(e.target.shouldFail.value)
  }

  return (
    <div>
      <SetTitle text='Query Tests' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Query Tests</PageTitle>
        <Stack>
          <form onSubmit={handleInputSubmit}>
            <TextInput onInput={handleInputChange} placeholder='filter_by' />
            <Button mt='sm' onClick={null}>
              Submit to Typesense
            </Button>
          </form>
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
