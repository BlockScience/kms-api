import { SetTitle } from '@/utils'
import { TypographyStylesProvider, Box, Text, Button, Stack, Group } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { IconBrandGithub } from '@tabler/icons-react'
import { useApi } from '@/hooks/useApi'
import Markdown from '@/components/preact-markdown'
import { TagSpan } from '@/components/TagSpan'
import { Paragraphs } from '@/components/Skeleton'

export default function Schema() {
  const { result, loaded } = useApi('/meta/schema')

  // This preprocessing turns our plaintext tag syntax into a code block which we're hijacking to render our tags.
  // A better solution here would be to use a markdown renderer that supports custom components.
  const preprocess = (input: string) => {
    return input.replaceAll(/:([a-zA-Z0-9-_]*?)(?=\s|$)/g, '`$1`')
  }

  return (
    <div>
      <SetTitle text='Schema' />
      <Box maw={1000} mx='auto'>
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
          <TypographyStylesProvider>
            {loaded ? (
              <Markdown
                components={{
                  code: (node) => <TagSpan>{node.children}</TagSpan>,
                }}
              >
                {preprocess(result)}
              </Markdown>
            ) : (
              Paragraphs([5, 3, 3])
            )}
          </TypographyStylesProvider>
        </Stack>
      </Box>
    </div>
  )
}
