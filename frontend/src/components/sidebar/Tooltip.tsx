import { Tooltip } from '@mantine/core'
import { VNode } from 'preact'

interface NavTooltipProps {
  label: string
  disable?: boolean
  children?: VNode
}
export const NavTooltip = ({ label, disable, children }: NavTooltipProps) => {
  return disable ? (
    children
  ) : (
    <Tooltip label={label} position='right' withArrow arrowSize={8} openDelay={500} color='gray'>
      {children}
    </Tooltip>
  )
}
