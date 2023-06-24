import { Badge, createStyles, DefaultMantineColor } from '@mantine/core'
import type { VNode } from 'preact'
const useStyles = createStyles((theme) => ({
  badge: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    height: '1.6em',
    border: '1px solid',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    cursor: 'pointer',
  },
  badgeColored: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    marginTop: '0.3em',
    height: '1.6em',
    // borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    cursor: 'pointer',
  },
}))

interface InlineTagProps {
  color?: DefaultMantineColor
  children: VNode[] | VNode | string
}

export default function InlineTag({ color, children }: InlineTagProps) {
  const style = useStyles()

  return (
    <Badge
      tt='inherit'
      fw={500}
      size='lg'
      bg={color ? style.theme.fn.rgba(color, 0.3) : null}
      style={color ? { borderColor: style.theme.fn.lighten(color, 0.2), borderWidth: 1 } : {}}
      color={color || null}
      className={color ? style.classes.badgeColored : style.classes.badge}
    >
      {children}
    </Badge>
  )
}
