import { Kbd } from '@mantine/core'
import { useOs } from '@mantine/hooks'

export function ModKey() {
  const key = useOs() === 'macos' ? '⌘' : 'CTRL'
  return <Kbd>{key}</Kbd>
}
