import DocsTOC from '@/components/TableOfContents'
import Markdown from '@/components/DocMarkdown'
import { SetTitle } from '@/utils'
import { Box, Grid, ScrollArea, useMantineTheme } from '@mantine/core'
import { useState } from 'react'

const initialDoc = 'index'
const docs = [
  { label: 'Introduction', filename: 'index', order: 1 },
  { label: 'Search', filename: 'intro-search', order: 2 },
  { label: 'Advanced Search', filename: 'intro-searchAdvanced', order: 2 },
  { label: 'Shortcuts', filename: 'intro-shortcuts', order: 2 },
  { label: 'Feedback', filename: 'intro-feedback', order: 1 },
  { label: 'Research', order: 1 },
  { label: 'Generic Objects', filename: 'research-objects', order: 2 },
  { label: 'First-Class Relations', filename: 'research-relations', order: 2 },
]

export default function Documentation() {
  const theme = useMantineTheme()
  const [currentDoc, setCurrentDoc] = useState(initialDoc)

  function handlePageChange(page: number, filename: string) {
    setCurrentDoc(filename)
  }

  return (
    <>
      <SetTitle text='Docs' />
      <Grid columns={24}>
        <Grid.Col
          span={6}
          p='1rem'
          pt='3rem'
          style={{
            borderRight:
              theme.colorScheme === 'dark'
                ? `1px solid ${theme.colors.dark[5]}`
                : `1px solid ${theme.colors.gray[2]}`,
          }}
        >
          <Box mt={theme.spacing.xl} ml={theme.spacing.xl}>
            <DocsTOC
              title='Documentation'
              docs={docs}
              onActiveChange={handlePageChange}
              icons={[null, '#']}
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={18}>
          <ScrollArea h='100vh'>
            <Box m='4em'>
              <Markdown filename={currentDoc} />
            </Box>
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  )
}
