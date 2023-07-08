import { SetTitle } from '@/utils'
import { Box, Button, Stack, TextInput, Textarea, Text, Group } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { Prism } from '@mantine/prism'
import { useState } from 'preact/hooks'
import { parser } from '@/parsers/parser'
import { useApi } from '@/hooks/useApi'

export default function QueryTest() {
  const { result, error, update } = useApi('/objects/query', {
    method: 'POST',
  })
  const [parserResponse, setParserResponse] = useState('Parser response')
  const [parseError, setParseError] = useState(false)
  const [shouldPassTests, setShouldPassTests] = useState([])
  const [shouldFailTests, setShouldFailTests] = useState([])
  const [currentTest, setCurrentTest] = useState('')

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
    setCurrentTest(e.target.filterString.value)
    update({ q: '*', filter_by: e.target.filterString.value })
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
        <PageTitle>Grammar Tests</PageTitle>
        <Stack>
          <Text>Grammar</Text>
          <Text>Compile?</Text>
          <Group>
            <Text>Should Pass</Text>
            <Text>Should Fail</Text>
          </Group>
          <Group>
            <Text>Test against PEG</Text>
            <Text>Test against Typesense</Text>
          </Group>
        </Stack>
        {/* <Stack>
          <form onSubmit={handleInputSubmit}>
            <TextInput name='filterString' onInput={handleInputChange} placeholder='filter_by' />
            <Button type='submit' mt='sm'>
              Submit to Typesense
            </Button>
          </form>
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
            {parseError ? parserResponse : '✅ Syntax is valid'}
          </Prism>
          <Prism withLineNumbers language='json'>
            {result
              ? `Filter string: "${currentTest}"\n` + JSON.stringify(result, null, 2) || ''
              : `Filter string: "${error}"\n` + JSON.stringify(error, null, 2) || ''}
          </Prism>

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
            {result && (
              <Prism withLineNumbers language='json'>
                {result}
              </Prism>
            )}
          </form>
        </Stack> */}
      </Box>
    </div>
  )
}
