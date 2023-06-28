import { Title, Space } from '@mantine/core'
import { VNode } from 'preact'

interface PageTitleProps {
  /* Whether to add space after the title */
  noSpace?: boolean
  children: string | VNode
}

export function PageTitle(props: PageTitleProps) {
  return (
    <div>
      <Title mt={30} order={2}>
        {props.children}
      </Title>
      {!props.noSpace && <Space h='sm' />}
    </div>
  )
}
