import Chat from '@/components/Conversation'
import { PageTitle } from '@/components/typography/PageTitle'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Button, Group, Select, Stack } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'preact/hooks'

export default function LLMChat() {
  const { user } = useAuth0()
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [chatHistory, setChatHistory] = useState<[string, string][]>([])
  const userId = user.email
  const chatId = 1
  // TODO: Get chat history on first load

  // TODO: handle cases where user is not logged in, or has no email, etc.
  // ^ Is this a reachable state?

  const { result, update } = useApi(`/user/${userId}/chat/${chatId}`, {
    method: 'POST',
  })

  useEffect(() => {
    if (!result) return
    setChatHistory([...chatHistory, [currentPrompt, result]])
    setCurrentPrompt('')
  }, [result])

  const handleSubmit = (value: string) => {
    setCurrentPrompt(value)
    update({ prompt: value })
  }

  return (
    <div>
      <SetTitle text='Chat' />
      <Box maw={1200} mx='auto'>
        <Stack spacing='xs'>
          <Group position='apart'>
            <PageTitle>LLM Chat</PageTitle>
            <Group>
              <Select
                placeholder='Mode'
                data={[
                  { value: 'conversational', label: 'Conversational' },
                  { value: 'agentic', label: 'Agentic' },
                ]}
                defaultValue='conversational'
              />
              <Select
                data={[
                  { value: 'general', label: 'General Embeddings' },
                  { value: 'none', label: 'None' },
                ]}
                defaultValue='general'
              />
              <Select
                data={[
                  { value: '1', label: 'Chat #1' },
                  { value: '2', label: 'Chat #2' },
                ]}
                defaultValue='1'
              />
              <Button variant='outline' component='a' leftIcon={<IconPlus />}>
                New
              </Button>
            </Group>
          </Group>
          <Chat height='80vh' onSubmit={handleSubmit}>
            {chatHistory.map(([prompt, response], i) => (
              <>
                <Chat.Message user='orion' key={i}>
                  {prompt}
                </Chat.Message>
                <Chat.Message isResponse>{response}</Chat.Message>
              </>
            ))}
            {currentPrompt && <Chat.Message user='orion'>{currentPrompt}</Chat.Message>}
          </Chat>
        </Stack>
      </Box>
    </div>
  )
}
