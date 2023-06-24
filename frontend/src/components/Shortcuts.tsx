import { useHotkeys } from '@mantine/hooks'
import { useSpotlight } from '@/components/mantine-spotlight'

//* * Registers and processes hotkey combinations across the app */
export function Shortcuts() {
  const spotlight = useSpotlight()

  useHotkeys([
    ['mod+K', () => spotlight.openSpotlightWithQuery('>')],
    ['/', () => spotlight.openSpotlightWithQuery('')],
  ])
  return <div />
}
