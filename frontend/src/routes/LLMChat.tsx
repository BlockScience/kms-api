import Chat from '@/components/Conversation'
import { SplitButton } from '@/components/SplitButton'
import { PageTitle } from '@/components/typography/PageTitle'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Group, Select, Stack } from '@mantine/core'
import { useEffect, useState } from 'preact/hooks'

export default function LLMChat() {
  const userId = useAuth0().user.email
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [localChatHistory, setLocalChatHistory] = useState<[string, string][]>([])
  const [currentChatId, setCurrentChatId] = useState(null)

  const { result, update } = useApi(null, {
    method: 'POST',
    defer: true,
  })

  useEffect(() => {
    if (!result) return
    setLocalChatHistory([...localChatHistory, [currentPrompt, result]])
    setCurrentPrompt('')
  }, [result])

  const handlePromptSubmit = (value: string) => {
    setCurrentPrompt(value)
    update({ prompt: value })
  }
  const hanndleChatSelect = (value: string) => {}

  return (
    <div>
      <SetTitle text='Chat' />
      <Box maw={1200} mx='auto'>
        <Stack spacing='xs'>
          <Group position='apart'>
            <PageTitle>Chat</PageTitle>
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
              <SplitButton
                label='Previous Chats'
                onSubmit={hanndleChatSelect}
                items={[
                  ['1', 'Chat #1'],
                  ['2', 'Chat #2'],
                  ['3', 'Chat #3'],
                ]}
              />
            </Group>
          </Group>
          <Chat height='80vh' onSubmit={handlePromptSubmit}>
            {localChatHistory.map(([prompt, response], i) => (
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
