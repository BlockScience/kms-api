import { ActionIcon, Center, Kbd, TextInput, createStyles, px } from '@mantine/core'
import { useSpotlight } from '@/components/mantine-spotlight'
import { IconSearch } from '@tabler/icons-react'
import { NavTooltip } from './Tooltip'

const useStyles = createStyles((theme) => ({
  searchInputShortcut: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[7],
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
  },
}))

export default function Search({ fullwidth }: { fullwidth: boolean }) {
  const { classes } = useStyles()
  const spotlight = useSpotlight()
  const handleSearch = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      e.preventDefault()
      e.target.blur()
      spotlight.openSpotlight()
    }
  }
  const searchFullwidth = () => {
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
  const searchSmall = () => {
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

  return fullwidth ? searchFullwidth() : searchSmall()
}
