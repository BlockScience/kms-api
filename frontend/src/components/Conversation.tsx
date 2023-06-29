import {
  Group,
  Paper,
  useMantineTheme,
  Text,
  Textarea,
  Avatar,
  Box,
  Divider,
  ScrollArea,
  Center,
} from '@mantine/core'
import { IconBrain, IconRobot, IconSend } from '@tabler/icons-react'
import { FunctionComponent, ComponentChildren, cloneElement, VNode, toChildArray } from 'preact'

type ChatComponent = FunctionComponent<ChatProps> & {
  Message: MessageComponent
  Input: InputComponent
}
type MessageComponent = FunctionComponent<MessageProps>
type InputComponent = FunctionComponent

interface ChatProps {
  children: ComponentChildren
  user: string
  height?: number | string
  maxHeight?: number | string
  startLabel?: string
}
const Chat: ChatComponent = ({
  children,
  user,
  startLabel,
  height,
  maxHeight,
}: ChatProps): JSX.Element => {
  return (
    <div>
      <Divider />
      {/* 
      // TODO: create a robust replacement for mantine ScrollArea and ScrollArea.Autosize
      // @ts-ignore */}
      <ScrollArea.Autosize mah={maxHeight} h={height}>
        <Center>
          <Text mt='xl' tt='uppercase' size='sm' color='dimmed'>
            {startLabel || 'start of conversation'}
          </Text>
        </Center>
        {toChildArray(children).map((child) => cloneElement(child as VNode<any>, { user: user }))}
      </ScrollArea.Autosize>
      <Chat.Input />
    </div>
  )
}

interface MessageProps {
  children: ComponentChildren
  isResponse?: boolean
  user?: string
}
const Message: MessageComponent = ({ children, user, isResponse }: MessageProps): JSX.Element => {
  const dark = useMantineTheme().colorScheme === 'dark'
  return (
    <>
      <Paper m='sm' p='sm'>
        <Divider mb='sm' />
        <Group position='left' align='start' noWrap>
          <Box size='2rem'>
            {isResponse ? (
              <IconBrain size='2rem' stroke={1.5} />
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
const Input: InputComponent = (): JSX.Element => (
  <Paper m={0} p={0}>
    <Group position='left' align='top'>
      <Textarea
        w='100%'
        h='100%'
        // @ts-ignore
        placeholder='Send a message'
        icon={<IconSend size='1.2rem' />}
        autosize
        minRows={1}
        maxRows={4}
      />
    </Group>
  </Paper>
)

Chat.Message = Message
Chat.Input = Input

export default Chat
