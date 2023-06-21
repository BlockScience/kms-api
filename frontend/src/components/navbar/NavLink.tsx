// @ts-nocheck

import { ThemeIcon, UnstyledButton, Group, Text, createStyles } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { MouseEventHandler } from 'react'

const useStyles = createStyles((theme) => ({
  navText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[8],
  },
}))

interface BaseLinkProps {
  icon: React.ReactNode
  color: string
  label: string
}
interface InternalLinkProps extends BaseLinkProps {
  path: string
  href?: never
}
interface ExternalLinkProps extends BaseLinkProps {
  path?: never
  href: string
}
export type NavLinkProps = InternalLinkProps | ExternalLinkProps

// const ConditionalWrapper = ({ condition, wrapper, children }) =>
//   condition ? wrapper(children) : children

export function NavLink({ icon, color, label, path, href }: NavLinkProps) {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const handleNavigate = (event: MouseEventHandler<HTMLButtonElement>) => {
    if (event.button === 0) {
      console.log('handling')
      if (path) navigate(path)
      if (href) window.open(href, '_blank')
    }
  }
  return (
    <UnstyledButton
      onMouseDown={handleNavigate}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm' className={classes.navText}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
    // </ConditionalWrapper>
  )
}

export function mapNavLinks(links: NavLinkProps[]) {
  return links.map((link) => <NavLink {...link} key={link.label} />)
}
