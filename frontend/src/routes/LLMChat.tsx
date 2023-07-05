import Chat from '@/components/Conversation'
import { SplitButton } from '@/components/SplitButton'
import { PageTitle } from '@/components/typography/PageTitle'
import { useApi } from '@/hooks/useApi'
import { SetTitle } from '@/utils'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Group, Select, Stack } from '@mantine/core'
import { use } from 'cytoscape'
import { useEffect, useState } from 'preact/hooks'

export default function LLMChat() {
  // get userId on load
  const userId = useAuth0().user.email
  const [previousChats, setPreviousChats] = useState<string[]>([])
  const [currentPrompt, setCurrentPrompt] = useState(null)
  const [currentChat, setCurrentChat] = useState(null)
  const [localChatHistory, setLocalChatHistory] = useState<[string, string][]>([])

  const { result: previousChatsResult } = useApi(`/user/${userId}/chat`, {
    method: 'GET',
  })
  const { result: previousChatHistoryResult, update: getPreviousChatHistory } = useApi(null, {
    method: 'GET',
    defer: true,
  })
  const { result: chatIdResult, update: getChatId } = useApi(`/user/${userId}/chat`, {
    method: 'POST',
    defer: true,
  })
  const { result: promptResult, update: getPromptResponse } = useApi(null, {
    method: 'POST',
    defer: true,
  })

  useEffect(() => {
    if (!previousChatHistoryResult) return
    console.log(previousChatHistoryResult)
    setLocalChatHistory(previousChatHistoryResult)
  }, [previousChatHistoryResult])

  useEffect(() => {
    if (!previousChatsResult) return
    console.log(previousChatsResult)
    setPreviousChats(previousChatsResult)
  }, [previousChatsResult])

  // when we get a chatId (from creating a new chat), set it.
  useEffect(() => {
    if (!chatIdResult) return
    console.log(chatIdResult)

    setCurrentChat(chatIdResult['chat_id'])
  }, [chatIdResult])

  // process prompt when we can
  useEffect(() => {
    if (!currentChat) return
    if (!currentPrompt) return
    console.log(currentPrompt, currentChat)

    getPromptResponse({ prompt: currentPrompt }, `/user/${userId}/chat/${currentChat}`)
  }, [currentChat, currentPrompt])

  // update local state when we get new reponse to prompt
  useEffect(() => {
    if (!promptResult) return
    console.log(promptResult)
    setLocalChatHistory([...localChatHistory, [currentPrompt, promptResult]])
    setCurrentPrompt(null)
  }, [promptResult])

  const handlePromptSubmit = (value: string) => {
    if (!currentChat) {
      getChatId({})
    }
    setCurrentPrompt(value)
  }
  const hanndleChatSelect = (value: string) => {
    // TODO: fetch previous chats
    setCurrentChat(value)
    getPreviousChatHistory({}, `/user/${userId}/chat/${value}`)
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
                onSubmit={hanndleChatSelect}
                items={
                  previousChats &&
                  previousChats.length > 0 &&
                  previousChats.map((id) => [id, `Chat #${id}`])
                }
              />
            </Group>
          </Group>
          <Chat height='80vh' onSubmit={handlePromptSubmit}>
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
