import { Kbd, TextInput, px } from '@mantine/core'
import { useSpotlight } from '@/components/mantine-spotlight'
import { IconSearch } from '@tabler/icons-react'
import NavItem from './sectionNavigation'

const SearchExpanded = () => {
  const spotlight = useSpotlight()
  const handleSearch = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      e.preventDefault()
      e.target.blur()
      spotlight.openSpotlight()
    }
  }
  return (
    <TextInput
      id='tour-searchInput'
      onMouseDown={handleSearch}
      style={{ cursor: 'pointer' }}
      placeholder='Search'
      icon={<IconSearch size={px('1rem')} />}
      rightSection={<Kbd>/</Kbd>}
      rightSectionWidth={27}
      styles={{ rightSection: { pointerEvents: 'none' } }}
    />
  )
}

const SearchCollapsed = ({ active }: { active: boolean }) => {
  return (
    <NavItem
      icon={<IconSearch size={px('1rem')} />}
      color='grape'
      label='Search'
      active={active}
      path='/search'
    />
  )
}

type Search = {
  Expanded: typeof SearchExpanded
  Collapsed: typeof SearchCollapsed
}

export const Search: Search = {
  Expanded: SearchExpanded,
  Collapsed: SearchCollapsed,
}
