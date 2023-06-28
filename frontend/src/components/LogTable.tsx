import { Group, Stack, Text } from '@mantine/core'
import ObjectRID from './ObjectRID'
import { JSX } from 'preact/jsx-runtime'
import { DataTable } from 'mantine-datatable'
import { Prism } from '@mantine/prism'

interface LogTableProps {
  data: {
    event: string
    objectRID: string
    user: string
    data: JSX.Element
    time: string
  }[]
}

export function LogTable({ data }: LogTableProps) {
  return (
    <DataTable
      withBorder
      height={500}
      borderRadius='md'
      withColumnBorders
      scrollAreaProps={{ type: 'never' }}
      highlightOnHover
      idAccessor='time'
      rowExpansion={{
        content: ({ record }) => <Prism language='json'>{record.data}</Prism>,
      }}
      columns={[
        { accessor: 'event' },
        { accessor: 'object' },
        { accessor: 'user' },
        { accessor: 'time' },
      ]}
      records={[
        {
          event: 'Tags Changed',
          object: '8DE3G9',
          user: 'Donald Knuth',
          time: '12/32/2021',
          data: JSON.stringify({
            event: 'string',
            objectRID: 'string',
            user: 'string',
            data: 'JSX.Element',
            time: 'string',
          }),
        },
        {
          event: 'Tags Changed',
          object: '8DE3G9',
          user: 'Donald Knuth',
          time: '13/32/2021',
          data: JSON.stringify({
            event: 'something',
            objectRID: 'UHEF32',
          }),
        },
        {
          event: 'Tags Changed',
          object: '8DE3G9',
          user: 'Donald Knuth',
          time: '15/32/2021',
          data: JSON.stringify({
            event: 'foobar',
            objectRID: '1231ref',
            user: 'string',
            data: 'JSX.Element',
            time: 'string',
          }),
        },
      ]}
    />
  )
}
