import { createStyles, Button, Menu, Group, ActionIcon, rem } from '@mantine/core'
import {
  IconTrash,
  IconBookmark,
  IconCalendar,
  IconChevronDown,
  IconPlus,
  IconMessage,
} from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    // border: 0,
    borderLeft: `${rem(0)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}))

export function SplitButton({
  label,
  items,
  onSubmit,
}: {
  label: string
  /** Array of [value, name] pairs*/
  items: [value: string, name: string][]
  onSubmit: (value: string) => void
}) {
  const { classes, theme } = useStyles()
  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 6]

  return (
    <Group noWrap spacing={0}>
      <Menu transitionProps={{ transition: 'pop' }} position='bottom-end' withinPortal>
        <Menu.Target>
          <Button
            variant='outline'
            className={classes.button}
            leftIcon={<IconChevronDown size='1rem' stroke={2} />}
          >
            {label}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {items.map(([value, name], i) => (
            <Menu.Item
              key={i}
              icon={<IconMessage size='1rem' stroke={1.5} color={menuIconColor} />}
              onClick={() => onSubmit(value)}
            >
              {name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <ActionIcon
        variant='outline'
        color={theme.primaryColor}
        size={36}
        className={classes.menuControl}
      >
        <IconPlus stroke={1} />
      </ActionIcon>
    </Group>
  )
}
