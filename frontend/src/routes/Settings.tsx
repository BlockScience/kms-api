import { useForm } from '@mantine/form'
import { Button, Group, NumberInput, Checkbox, Stack, Text, ActionIcon } from '@mantine/core'
import { useAuth0 } from '@auth0/auth0-react'
import { Layout } from '@/components/Layout'
import { IconLogout } from '@tabler/icons-react'

export default function Settings() {
  const { logout, user } = useAuth0()
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
    <Layout.Simple
      title='Settings'
      dividerLabel={user ? `Signed in as ${user.name}` : null}
      rightSection={
        <Button
          variant='outline'
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          leftIcon={<IconLogout stroke={1.5} />}
        >
          Log Out
        </Button>
      }
    >
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
    </Layout.Simple>
  )
}
