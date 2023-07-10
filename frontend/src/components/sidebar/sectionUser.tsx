import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  Skeleton,
  Center,
  createStyles,
  Loader,
  px,
} from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { NavTooltip } from './Tooltip'

const useStyles = createStyles((theme) => ({
  baseButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

export function User({ expanded }: { expanded: boolean }) {
  const { classes } = useStyles()
  const { user, isAuthenticated } = useAuth0()

  const LoadingExpanded = (
    <Group align='center' style={{ padding: 9.5 }}>
      <Skeleton width={40} height={40} circle />
      <Box sx={{ flex: 1 }}>
        <Skeleton height={12} mb={10} width='85%' radius='xl' />
        <Skeleton height={8} mt={6} width='70%' radius='xl' />
      </Box>
    </Group>
  )
  const LoadingCollapsed = (
    <Center>
      <Loader size={px('1.8rem')} color='gray' />
    </Center>
  )
  const User = (
    <Avatar alt='' radius='xl' color='gray' variant='filled'>
      {user?.name.slice(0, 2).toUpperCase()}
    </Avatar>
  )
  const UserCollapsed = (
    <NavTooltip label='Settings'>
      <Center style={{ cursor: 'pointer' }}>{User}</Center>
    </NavTooltip>
  )

  const UserExpanded = (
    <UnstyledButton
      className={classes.baseButton}
      w='100%'
      style={{ whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis' }}
    >
      <Group noWrap spacing='xs'>
        {User}
        <Box>
          <Text size='sm' weight={500}>
            {user?.name}
          </Text>
          <Text color='dimmed' size='xs'>
            {user?.email}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  )

  return (
    <NavLink to='/settings' style={{ textDecoration: 'none' }} id='tour-userSettings'>
      {() => {
        if (expanded) {
          if (isAuthenticated && user) {
            return UserExpanded
          } else {
            return LoadingExpanded
          }
        } else {
          if (isAuthenticated && user) {
            return UserCollapsed
          } else {
            return LoadingCollapsed
          }
        }
      }}
    </NavLink>
  )
}
