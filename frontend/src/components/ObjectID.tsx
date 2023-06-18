import { Text, Group, CopyButton, Tooltip, Popover, ActionIcon, Badge } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { Md5 } from 'ts-md5';

export default function ObjectID(props: { id: string, charLimit?: number, popoverPosition?: 'left' | 'right' | 'top' | 'bottom' }) {
  const charLimit = props.charLimit || 7;
  const popoverPosition = props.popoverPosition || 'left';
  // Will pull this out once we are using real IDs
  const id = Md5.hashStr(props.id);
  return (
    <Popover position={popoverPosition} withArrow shadow="md" arrowSize={15}>
      <Popover.Target>
        <Badge style={{ cursor: 'pointer' }} radius='sm'>{id.slice(0, charLimit)}</Badge>
      </Popover.Target>
      <Popover.Dropdown p={5} pl={10} m='xs'>
        <Group>
          <Text tt="uppercase" color='dimmed' size="xs" fw={500}>Object: {id}</Text>
          <CopyButton value={id} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}