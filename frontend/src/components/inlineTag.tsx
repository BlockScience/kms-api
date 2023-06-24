import { Badge, createStyles } from '@mantine/core'
import type { VNode } from 'preact'
const useStyles = createStyles((theme) => ({
  badge: {
    borderRadius: theme.radius.sm,
    padding: '0px 3px 0px 3px',
    marginTop: '0em',
    height: '1.7em',
    border: '1px solid',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3],
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    cursor: 'pointer',
  },
}))

export default function TagSpan({ children }: { children: VNode[] | VNode | string }) {
  const { classes } = useStyles()

  return (
    <Badge tt='inherit' fw={500} size='lg' className={classes.badge}>
      {children}
    </Badge>
  )
}
