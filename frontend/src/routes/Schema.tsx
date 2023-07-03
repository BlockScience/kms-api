import { SetTitle } from '@/utils'
import { Box, Button, Stack, Group } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { IconBrandGithub } from '@tabler/icons-react'
import { useApi } from '@/hooks/useApi'
import { Paragraphs } from '@/components/Skeleton'
import Markdown from 'markdown-to-jsx'
import { TagSpan } from '@/components/TagSpan'
import { common } from '@/components/typography/overrides'

export default function Schema() {
  const { result, loading, error } = useApi('/meta/schema')
  const preprocess = (s: string) =>
    s.replace(/:([a-zA-Z0-9-_]*?)(?=\s|$)/g, '<schemaTag>$1</schemaTag>')
  return (
    <div>
      <SetTitle text='Schema' />
      <Box maw={1200} mx='auto'>
        <Group position='apart'>
          <PageTitle>Schema</PageTitle>
          <Button
            variant='outline'
            component='a'
            href='https://github.com/blockScience/kms-schema'
            target='_blank'
            leftIcon={<IconBrandGithub />}
          >
            Edit schema on GitHub
          </Button>
        </Group>
        <Stack>
          {result ? (
            <Markdown
              options={{
                overrides: {
                  schemaTag: ({ children }) => <TagSpan>{children}</TagSpan>,
                  ...common,
                },
              }}
            >
              {preprocess(result)}
            </Markdown>
          ) : loading ? (
            Paragraphs([5, 3, 3])
          ) : (
            error && 'Error loading schema'
          )}
        </Stack>
      </Box>
    </div>
  )
}
