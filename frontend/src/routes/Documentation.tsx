import DocsTOC from '@/components/TableOfContents'
import { Box, Grid, ScrollArea, useMantineTheme } from '@mantine/core'
import { useState } from 'preact/hooks'
import Markdown from 'markdown-to-jsx'
import { common } from '@/components/typography/overrides'
import { useTitle } from '@/hooks'
import { Layout } from '@/components/Layout'

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

function getDoc(filename: string) {
  const [markdown, setState] = useState('')
  import(`../assets/docs/${filename}.md`)
    .then((module) =>
      fetch(module.default)
        .then((res) => res.text())
        .then((md) => {
          setState(md)
        })
        .catch((err) => console.log(err)),
    )
    .catch((err) => console.log(err))

  return markdown
}

export default function Documentation() {
  const [currentDoc, setCurrentDoc] = useState(initialDoc)
  function handlePageChange(page: number, filename: string) {
    setCurrentDoc(filename)
  }
  useTitle('Docs')

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Main p={60} title='Documentation'>
        <Markdown
          options={{
            overrides: {
              dw: ({ children }) => <span>{children}</span>,
              ...common,
            },
          }}
        >
          {getDoc(currentDoc)}
        </Markdown>
      </Layout.Sidebar.Main>
      <Layout.Sidebar.Side p='xl' mt='xl'>
        <DocsTOC docs={docs} onActiveChange={handlePageChange} icons={[null, '#']} />
      </Layout.Sidebar.Side>
    </Layout.Sidebar>
  )
}
