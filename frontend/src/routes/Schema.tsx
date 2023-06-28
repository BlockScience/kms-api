import { SetTitle } from '@/utils'
import { TypographyStylesProvider, Box, Button, Stack, Group } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { IconBrandGithub } from '@tabler/icons-react'
import { useApi } from '@/hooks/useApi'
import { Paragraphs } from '@/components/Skeleton'
import { MD } from '@/components/Markdown'

export default function Schema() {
  const { result, loaded } = useApi('/meta/schema')

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
              <MD
                markdown={result}
                preprocess={(s) => s.replace(/:([a-zA-Z0-9-_]*?)(?=\s|$)/g, '`$1`')}
                postprocess={(s) => s.replace(/<code>(.*?)<\/code>/g, '<mark>$1</mark>')}
              />
            ) : (
              Paragraphs([5, 3, 3])
            )}
          </TypographyStylesProvider>
        </Stack>
      </Box>
    </div>
  )
}
