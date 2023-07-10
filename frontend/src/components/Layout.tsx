import { Stack, Box, Group, Title, Text, Divider, createStyles } from '@mantine/core'
import { ComponentChildren } from 'preact'
import { useTitle } from '@/hooks'

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : '#23282e',
    backgroundImage: `linear-gradient(90deg, ${theme.fn.rgba(
      theme.colors.blue[6],
      0.5,
    )} 0%, ${theme.fn.rgba(theme.colors.violet[6], 0.5)} 100%)`,
    backgroundPositionY: '1.7rem',
    backgroundSize: '100% 35%',
    backgroundRepeat: 'no-repeat',
    paddingRight: '0.2rem',
    paddingLeft: '0.2rem',
  },
}))

interface SimpleProps {
  children: ComponentChildren
  title: string
  dividerLabel?: string
  rightSection?: ComponentChildren | ComponentChildren[]
}

function Simple({ children, title, rightSection, dividerLabel }: SimpleProps) {
  const { classes } = useStyles()
  useTitle(title)
  return (
    <Box maw={1200} mx='auto' my='2rem'>
      <Group position='apart' align='end' mb='sm' noWrap>
        <Title shrink order={1} weight={900} className={classes.title}>
          {title}
        </Title>
        <Group noWrap>{rightSection}</Group>
      </Group>
      {(dividerLabel || dividerLabel === '') && (
        <Divider mt={0} mb='sm' label={dividerLabel} labelPosition='center' />
      )}
      <Stack>{children}</Stack>
    </Box>
  )
}

type Layout = {
  Simple: typeof Simple
}

export const Layout: Layout = {
  Simple: Simple,
}
