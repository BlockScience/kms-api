import {
  Stack,
  Box,
  Group,
  Title,
  Divider,
  createStyles,
  Grid,
  ScrollArea,
  BoxProps,
} from '@mantine/core'
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
    paddingRight: '0.3rem',
    paddingLeft: '0.3rem',
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
  useTitle(title, false)
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

type SidebarProps = {
  children: [ComponentChildren, ComponentChildren]
}

function Sidebar({ children }: SidebarProps) {
  const [Major, Minor] = children

  return (
    <>
      <Grid columns={24}>
        <Grid.Col span={18} pb={0}>
          {/* 
          // @ts-ignore */}
          <ScrollArea h='100vh'>{Major}</ScrollArea>
        </Grid.Col>
        <Grid.Col span={6} p={0}>
          {Minor}
        </Grid.Col>
      </Grid>
    </>
  )
}

type MajorProps = {
  children: ComponentChildren
  title: string
} & BoxProps

function SidebarMain({ title, children, ...rest }: MajorProps) {
  const { classes } = useStyles()
  return (
    <Box {...rest}>
      <Group position='apart'>
        <Title shrink order={1} weight={900} className={classes.title}>
          {title}
        </Title>
      </Group>
      {children}
    </Box>
  )
}

type MinorProps = {
  children: ComponentChildren
} & BoxProps

function SidebarSide({ children, ...rest }: MinorProps) {
  return <Box {...rest}>{children}</Box>
}

Sidebar.Main = SidebarMain
Sidebar.Side = SidebarSide

type Layout = {
  Simple: typeof Simple
  Sidebar: typeof Sidebar
}

export const Layout: Layout = {
  Simple: Simple,
  Sidebar: Sidebar,
}
