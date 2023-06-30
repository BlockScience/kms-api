import { SetTitle } from '@/utils'
import { Box, Button, Group, Stack, TextInput } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { Prism } from '@mantine/prism'
import { useState } from 'preact/hooks'

export default function QueryTest() {
  const [parserResponse, setParserResponse] = useState('nothing here')
  const [typesenseResponse, setTypesenseResponse] = useState('nothing here')
  // const { result, loaded } = useApi('/meta/schema')
  return (
    <div>
      <SetTitle text='Query Tests' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Query Tests</PageTitle>
        <Stack>
          <Group grow>
            <TextInput placeholder='filter_by string' />
            <Box grow>
              <Button onClick={null}>Submit to Typesense</Button>
            </Box>
          </Group>
          <Prism language='json'>{parserResponse}</Prism>
          <Prism language='json'>{typesenseResponse}</Prism>
        </Stack>
      </Box>
    </div>
  )
}
