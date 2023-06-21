import { useState } from 'react'
import { createStyles, Table, ScrollArea, rem } from '@mantine/core'
import ObjectRID from './ObjectRID'

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

interface LogTableProps {
  data: {
    event: string
    objectRID: string
    user: string
    data: unknown
    time: string
  }[]
}

export function LogTable({ data }: LogTableProps) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const rows = data.map((row) => (
    <tr key={row.objectRID}>
      <td>{row.event}</td>
      <td>
        <ObjectRID id={row.objectRID} popoverPosition='top' />
      </td>
      <td>{row.user}</td>
      <td>{row.data}</td>
      <td>{row.time}</td>
    </tr>
  ))

  return (
    <ScrollArea h={400} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Event</th>
            <th>Object</th>
            <th>User</th>
            <th>Data</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
