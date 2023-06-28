import { useState } from 'preact/hooks'
import { createStyles, Box, Text, Group, rem, useMantineTheme, px } from '@mantine/core'
import { IconListSearch } from '@tabler/icons-react'
import { closestWithCondition } from '@/utils'

const LINK_HEIGHT = 38
const INDICATOR_SIZE = 10
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2
const INDENT = '1.2rem'

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: 'block',
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    lineHeight: rem(LINK_HEIGHT),
    fontSize: theme.fontSizes.sm,
    height: rem(LINK_HEIGHT),
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderLeft: `${rem(2)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
  },
  linkSection: {
    fontWeight: 700,
  },

  links: {
    position: 'relative',
  },

  indicator: {
    transition: 'transform 150ms ease',
    border: `${rem(2)} solid ${
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    height: rem(INDICATOR_SIZE),
    width: rem(INDICATOR_SIZE),
    borderRadius: rem(INDICATOR_SIZE),
    position: 'absolute',
    left: `calc(-${rem(INDICATOR_SIZE)} / 2 + ${rem(1)})`,
  },
}))

export interface TableOfContentsProps {
  title: string
  docs: { label: string; filename?: string; order: number }[]
  /** arrray of icons to use for each level of nesting. null for no icon */
  icons?: (string | null)[]
  onActiveChange: (active: number, filename: string) => void
}

export default function DocsTOC({ docs, icons, title, onActiveChange }: TableOfContentsProps) {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState(0)
  const theme = useMantineTheme()
  const dimmed = theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6]

  const items = docs.map((item, index) => (
    <Box
      onClick={(event) => {
        event.preventDefault()
        if (item.filename) {
          setActive(index)
          onActiveChange(index, item.filename)
        } else {
          const closestDoc = closestWithCondition(docs, index, (doc) => doc.filename)
          setActive(closestDoc || 0)
          onActiveChange(closestDoc || 0, docs[closestDoc || 0].filename || '')
        }
      }}
      key={item.label}
      // TODO: See where else I can use this trick
      className={cx(classes.link, {
        [classes.linkActive]: active === index,
        [classes.linkSection]: !item.filename,
      })}
      sx={() => ({
        paddingLeft: `calc(${item.order} * ${INDENT})`,
        cursor: 'pointer',
      })}
    >
      <Group noWrap>
        {icons && (<div>{icons[item.order - 1]}</div> || null)}
        {item.label}
      </Group>
    </Box>
  ))

  const searchIconSize = 1.4

  return (
    <div>
      <Group mb='sm' noWrap>
        <IconListSearch size={px(`${searchIconSize}rem`)} stroke={1.5} color={dimmed} />
        <Text sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }} color={dimmed}>
          {title}
        </Text>
      </Group>
      <div className={classes.links} style={{ marginLeft: `${searchIconSize / 2}rem` }}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(${rem(active * LINK_HEIGHT + INDICATOR_OFFSET)})`,
          }}
        />
        {items}
      </div>
    </div>
  )
}
