import { ActionIcon, Center, Kbd, TextInput, px } from '@mantine/core'
import { useSpotlight } from '@/components/mantine-spotlight'
import { IconSearch } from '@tabler/icons-react'
import { NavTooltip } from './Tooltip'

export default function Search({ expanded }: { expanded: boolean }) {
  const spotlight = useSpotlight()
  const handleSearch = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      e.preventDefault()
      e.target.blur()
      spotlight.openSpotlight()
    }
  }
  const searchExpanded = () => {
    return (
      <TextInput
        id='tour-searchInput'
        onMouseDown={handleSearch}
        style={{ cursor: 'pointer' }}
        placeholder='Search'
        icon={<IconSearch size={px('1rem')} />}
        rightSection={<Kbd>/</Kbd>}
        styles={{ rightSection: { pointerEvents: 'none' } }}
      />
    )
  }
  const searchCollapsed = () => {
    return (
      <NavTooltip label='Search'>
        <Center>
          <ActionIcon
            id='tour-searchInput'
            size={30}
            onClick={handleSearch}
            variant='default'
            sx={{ svg: { pointerEvents: 'none' } }}
          >
            <IconSearch size={px('1rem')} />
          </ActionIcon>
        </Center>
      </NavTooltip>
    )
  }

  return expanded ? searchExpanded() : searchCollapsed()
}
