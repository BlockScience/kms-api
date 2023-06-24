import { Tooltip } from '@mantine/core'
import { ReactNode } from 'preact'

interface NavTooltipProps {
  label: string
  disable?: boolean
  children?: ReactNode
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
