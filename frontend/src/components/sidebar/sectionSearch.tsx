import { ActionIcon, Badge, Center, TextInput, createStyles } from '@mantine/core'
import { useSpotlight } from '@/components/mantine-spotlight'
import { IconSearch } from '@tabler/icons-react'
import { BaseSyntheticEvent } from 'react'
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
  const handleSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    e.target.blur()
    spotlight.openSpotlight()
  }
  const searchFullwidth = () => {
    return (
      <TextInput
        id='tour-searchInput'
        onMouseDown={handleSearch}
        style={{ cursor: 'pointer' }}
        placeholder='Search'
        icon={<IconSearch size='1rem' />}
        rightSection={
          <Badge size='xs' radius='xs' variant='filled' className={classes.searchInputShortcut}>
            /
          </Badge>
        }
      />
    )
  }
  const searchSmall = () => {
    return (
      <NavTooltip label='Search'>
        <Center>
          <ActionIcon size={30} onMouseDown={handleSearch} variant='default'>
            <IconSearch size='1rem' />
          </ActionIcon>
        </Center>
      </NavTooltip>
    )
  }

  return fullwidth ? searchFullwidth() : searchSmall()
}
