import { useNavigate } from 'react-router-dom'
import { createStyles, UnstyledButton, ThemeIcon, Group, Text, Center } from '@mantine/core'
import { NavTooltip } from '@/components/sidebar/Tooltip'

interface NavLinkStyle {
  active?: boolean
  fullwidth?: boolean
}

interface BaseLinkProps {
  icon: React.ReactNode
  color: string
  label: string
  active?: boolean
  fullwidth?: boolean
  id?: string
  //* * Called after link has navigated or opened link */
  onLinkActive?(): void
}
interface InternalLinkProps extends BaseLinkProps {
  path: string
  href?: never
}
interface ExternalLinkProps extends BaseLinkProps {
  path?: never
  href: string
}
export type NavigationProps = InternalLinkProps | ExternalLinkProps

const navLinkStyles = createStyles((theme, { active, fullwidth }: NavLinkStyle) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  label: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
  icon: {
    // TODO: use this syntax everywhere
    ...(active && {
      boxSizing: 'border-box',
      boxShadow: `0 0 0px 3px ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[3]
      }`,
    }),
  },
}))

export default function Navigation({
  icon,
  color,
  label,
  path,
  href,
  active,
  fullwidth,
  onLinkActive,
  ...props
}: NavigationProps) {
  const { classes } = navLinkStyles({ active, fullwidth })
  const navigate = useNavigate()
  const handleNavigate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (event.button === 0) {
      if (path) navigate(path)
      if (href) window.open(href, '_blank')
      onLinkActive?.()
    }
  }

  return (
    <NavTooltip label={label} disable={fullwidth}>
      <UnstyledButton className={classes.button} onMouseDown={handleNavigate} id={props.id}>
        <Group position={fullwidth ? 'left' : 'center'}>
          <ThemeIcon color={color} variant='light' className={classes.icon}>
            {icon}
          </ThemeIcon>
          {fullwidth && (
            <Text size='sm' className={classes.label}>
              {label}
            </Text>
          )}
        </Group>
      </UnstyledButton>
    </NavTooltip>
  )
}
