import DocsTOC from '@/components/TableOfContents'
import Markdown from '@/utilities/markdown'
import { SetTitle } from '@/utilities/metadata'
import {
  Box,
  Grid,
  ScrollArea,
  Flex,
  Navbar,
  Text,
  Aside,
  Group,
  TypographyStylesProvider,
  Button,
  createStyles,
  useMantineTheme,
} from '@mantine/core'
import { useCallback, useState } from 'react'

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

// TODO: organise this with the other utls
function remToPx(rem: string) {
  // TODO: make this robust against misuse
  const regex = /^\d*/
  const matches = rem.match(regex)
  const match = matches ? matches[0] : '0'
  return parseFloat(match) * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export default function Documentation() {
  const navWidth = '20rem'
  const leftMargin = useMantineTheme().spacing.md
  const contentOffset = remToPx(navWidth) + remToPx(leftMargin)
  const [currentDoc, setCurrentDoc] = useState(initialDoc)

  function handlePageChange(page: number, filename: string) {
    setCurrentDoc(filename)
  }

  return (
    <>
      <SetTitle text='Docs' />
      <Navbar
        p='xs'
        width={{ base: navWidth }}
        style={{ visibility: 'visible' }}
        fixed
        position={{}}
      >
        <Navbar.Section mt={30}>
          <DocsTOC
            title='Documentation'
            docs={docs}
            onActiveChange={handlePageChange}
            icons={[null, '*']}
          />
        </Navbar.Section>
      </Navbar>
      <Box style={{ marginLeft: contentOffset }}>
        <Box mt={30} mx='xl'>
          <Markdown filename={currentDoc} />
        </Box>
      </Box>
    </>
  )
}
