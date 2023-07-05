import Chat from '@/components/Conversation'
import { SplitButton } from '@/components/SplitButton'
import { PageTitle } from '@/components/typography/PageTitle'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Group, Select, Stack } from '@mantine/core'
import { useEffect, useState } from 'preact/hooks'

export default function LLMChat() {
  // SETUP STATE
  const userId = useAuth0().user.email
  const [previousChats, setPreviousChats] = useState<string[]>([])
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [localChatHistory, setLocalChatHistory] = useState<[string, string][]>([])

  // SETUP API CALLS

  // Get all chats for this user on load (returns list of chat ids)
  useApi(`/user/${userId}/chat`, {
    method: 'GET',
    onResult: (result) => setPreviousChats(result),
  })

  // Get chat history for a given chat id (result is list of [prompt, response] tuples) - call is deferred
  const { update: getChatHistory } = useApi(null, {
    method: 'GET',
    defer: true,
    onResult: (result) => setLocalChatHistory(result),
  })

  // Get chat id for a new chat (result is chat id str) - call is deferred
  const { update: getChatId } = useApi(`/user/${userId}/chat`, {
    method: 'POST',
    defer: true,
    onResult: (result) => setCurrentChatId(result['chat_id']),
  })

  // Get response to a prompt (result is response str) - call is deferred
  const { update: getPromptResponse } = useApi(null, {
    method: 'POST',
    defer: true,
    stream: true,
    onResult: (result) => {
      setLocalChatHistory([...localChatHistory, [currentPrompt, result]])
      setCurrentPrompt(null)
    },
  })

  // MANAGE STATE
  useEffect(() => {
    // get response only when it makes sense to do so
    if (!currentChatId || !currentPrompt) return
    getPromptResponse({ prompt: currentPrompt }, `/user/${userId}/chat/${currentChatId}`)
  }, [currentChatId, currentPrompt])

  // HANDLE USER EVENTS
  const handlePromptSubmit = (value: string) => {
    if (!currentChatId) {
      getChatId({})
    }
    setCurrentPrompt(value)
  }
  const handleChatSelect = (value: string) => {
    setCurrentChatId(value)
    getChatHistory({}, `/user/${userId}/chat/${value}`)
  }
  const handleChatNew = () => {
    setCurrentChatId(null)
    setLocalChatHistory([])
    getChatId({})
  }

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
                onSelect={handleChatSelect}
                onNew={handleChatNew}
                items={
                  previousChats &&
                  previousChats.length > 0 &&
                  previousChats.map((id) => [id, `Chat #${id}`])
                }
              />
            </Group>
          </Group>
          <Chat
            height='80vh'
            onSubmit={handlePromptSubmit}
            startLabel={
              currentChatId
                ? `start of conversation #${currentChatId}`
                : 'start of new conversation'
            }
          >
            {localChatHistory.map(([prompt, response], i) => (
              <>
                <Chat.Message user={userId} key={i}>
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
