import { Badge, Divider, Group, Popover, SegmentedControl, Stack, Text, px } from '@mantine/core'
import { IconCheck, IconMinus, IconX } from '@tabler/icons-react'

function FilterState() {
  return (
    <SegmentedControl
      size='xs'
      defaultValue='ignore'
      transitionDuration={0}
      data={[
        {
          label: <IconCheck size={px('1rem')} />,
          value: 'include',
        },
        { label: <IconMinus size={px('1rem')} />, value: 'ignore' },
        { label: <IconX size={px('1rem')} />, value: 'exclude' },
      ]}
    />
  )
}
interface FilterProps {
  label: string
  data: string[]
  noFilters?: boolean
}
function FilterDropdown(props: FilterProps) {
  return (
    <Popover width={300} position='bottom' withArrow shadow='md' arrowSize={20}>
      <Popover.Target>
        <Badge
          variant={props.noFilters ? 'outline' : 'filled'}
          component='a'
          size='sm'
          radius={5}
          style={{ cursor: 'pointer' }}
        >
          {props.label}
        </Badge>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack spacing='xs'>
          <Group>
            <FilterState />
            <Text tt='uppercase' size='xs'>
              all
            </Text>
          </Group>
          <Divider />
          {props.data.map((s: string) => (
            <Group key={s}>
              <FilterState />
              <Text size='xs' tt='uppercase'>
                {s}
              </Text>
            </Group>
          ))}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
