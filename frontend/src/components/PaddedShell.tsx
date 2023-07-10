import { Box, ScrollArea } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export const PaddedShell = () => {
  return (
    // TODO: Replace with custom scroll area
    // @ts-ignore

    <ScrollArea h='100vh'>
      <Box p='sm'>
        <Outlet />
      </Box>
    </ScrollArea>
  )
}
