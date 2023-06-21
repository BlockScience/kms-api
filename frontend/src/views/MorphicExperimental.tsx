import { SetTitle } from '@/utilities/metadata'
import { Box } from '@mantine/core'
// import { Timeline, Text, Button, Box, Divider, Flex, Group } from '@mantine/core'
// import { IconClock, IconSettings } from '@tabler/icons-react'
// import { useNavigate } from 'react-router-dom'

export default function Morphic() {
  return (
    <div>
      <SetTitle text='Experimental' />
      <Box style={{ backgroundColor: 'purple' }} h='100vh'>
        {' '}
        foo
      </Box>{' '}
    </div>
  )
}
