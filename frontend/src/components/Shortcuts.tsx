import { useHotkeys } from '@mantine/hooks'
import { useSpotlight } from '@/components/mantine-spotlight'

//* * Registers and processes hotkey combinations across the app */
export function Shortcuts() {
  const spotlight = useSpotlight()

  useHotkeys([
    ['/', () => spotlight.openSpotlightWithQuery('')],
    ['shift+Slash', () => spotlight.openSpotlightWithQuery('> ')],
    ['alt+Slash', () => spotlight.openSpotlightWithQuery('? ')],
  ])
  return <div />
}
