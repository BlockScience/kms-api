import {
  Group,
  Paper,
  Text,
  Avatar,
  Box,
  Divider,
  ScrollArea,
  Center,
  TextInput,
} from '@mantine/core'
import { IconRobot, IconSend } from '@tabler/icons-react'
import { FunctionComponent, ComponentChildren } from 'preact'

type ChatComponent = FunctionComponent<ChatProps> & {
  Message: MessageComponent
}
type MessageComponent = FunctionComponent<MessageProps>

interface ChatProps {
  children: ComponentChildren
  height?: number | string
  maxHeight?: number | string
  startLabel?: string
  onSubmit?: (message: string) => void
}
const Chat: ChatComponent = ({
  children,
  startLabel,
  height,
  maxHeight,
  onSubmit,
}: ChatProps): JSX.Element => {
  return (
    <div>
      <Divider />
      {/* 
      // TODO: create a robust replacement for mantine ScrollArea and ScrollArea.Autosize
      // @ts-ignore */}
      <ScrollArea.Autosize mah={maxHeight} h={height}>
        <Center>
          <Text mt='xl' tt='uppercase' size='xs' color='dimmed'>
            {startLabel || 'start of conversation'}
          </Text>
        </Center>
        {children}
      </ScrollArea.Autosize>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(event.currentTarget.prompt.value)
          event.currentTarget.prompt.value = ''
        }}
      >
        <TextInput
          icon={<IconSend size='1.2rem' />}
          name='prompt'
          placeholder='Send a message'
        ></TextInput>
      </form>
    </div>
  )
}

interface MessageProps {
  children: ComponentChildren
  isResponse?: boolean
  user?: string
}
const Message: MessageComponent = ({ children, user, isResponse }: MessageProps): JSX.Element => {
  return (
    <>
      <Paper m='sm' p='sm'>
        <Divider mb='sm' />
        <Group position='left' align='start' noWrap>
          <Box size='2rem'>
            {isResponse ? (
              <IconRobot size='2rem' stroke={1.5} />
            ) : (
              <Avatar size='2rem' radius='xl' color='gray' variant='filled'>
                {user?.slice(0, 2).toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Text>{children}</Text>
        </Group>
      </Paper>
    </>
  )
}

Chat.Message = Message
export default Chat
