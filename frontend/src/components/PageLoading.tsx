import { Center, Text, Loader, Stack } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'

export function PageLoading() {
  return (
    <Center style={{ height: useViewportSize().height }}>
      <Stack align='center'>
        <Text size='xs' color='dimmed' tt='uppercase'>
          hold on a moment
        </Text>
        <Loader variant='dots' />
      </Stack>
    </Center>
  )
}
