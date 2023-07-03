import { SetTitle } from '@/utils'
import { useForm } from '@mantine/form'
import { Box, Button, Group, NumberInput, Checkbox, Stack, Text, Divider } from '@mantine/core'
import { PageTitle } from '@/components/typography/PageTitle'
import { useAuth0 } from '@auth0/auth0-react'

export default function Settings() {
  const user = useAuth0().user
  const settings = useForm({
    initialValues: {
      resultsPerPage: 15,
      contextPerResult: 20,
      validate: {
        resultsPerPage: (value: number) => (value > 0 ? null : 'Results must be greater than 0'),
        contextPerResult: (value: number) =>
          value > 4 ? null : 'Context must include at least 5 words',
      },
    },
  })

  return (
    <div>
      <SetTitle text='Settings' />
      <Box maw={1200} mx='auto'>
        <PageTitle>Settings</PageTitle>
        <Divider label={user ? `Signed in as ${user.name}` : null} labelPosition='center' />
        <form onSubmit={settings.onSubmit((values) => console.log(values))}>
          <Stack spacing='sm'>
            <NumberInput
              min={0}
              max={100}
              label='Search results per page'
              {...settings.getInputProps('resultsPerPage')}
            />
            <NumberInput
              min={5}
              max={100}
              label='Number of words per result'
              {...settings.getInputProps('contextPerResult')}
            />
            <Checkbox.Group
              defaultValue={['search', 'tag', 'governance']}
              label='Activity'
              description={
                <>
                  <Text>Activity information is only visible to you.</Text>
                  <Text>Public activity like resolving proposals will always be visible.</Text>
                </>
              }
            >
              <Group mt='xs'>
                <Checkbox value='search' label='Searching' />
                <Checkbox value='tag' label='Tagging' />
                <Checkbox value='governance' label='Governance' defaultChecked />
              </Group>
            </Checkbox.Group>
            <Group position='left' mt='md'>
              <Button type='submit'>Save Changes</Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </div>
  )
}
