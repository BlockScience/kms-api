import { Button } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import { useApi } from '@/hooks'
import { Paragraphs } from '@/components/Skeleton'
import Markdown from 'markdown-to-jsx'
import { TagSpan } from '@/components/TagSpan'
import { common } from '@/components/typography/overrides'
import { Layout } from '@/components/Layout'

export default function Schema() {
  const { result, loading, error } = useApi('/meta/schema')
  const preprocess = (s: string) =>
    s.replace(/:([a-zA-Z0-9-_]*?)(?=\s|$)/g, '<schemaTag>$1</schemaTag>')
  return (
    <Layout.Simple
      title='Schema'
      rightSection={
        <Button
          variant='outline'
          component='a'
          href='https://github.com/blockScience/kms-schema'
          target='_blank'
          leftIcon={<IconBrandGithub />}
        >
          Edit schema on GitHub
        </Button>
      }
    >
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
    </Layout.Simple>
  )
}
