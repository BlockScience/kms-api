import { SetTitle } from '@/utils'
import { TypographyStylesProvider, Box, Title, Text, Button, Stack, Group } from '@mantine/core'
import TagSpan from '@/components/InlineTag'
import { PageTitle } from '@/components/typography/PageTitle'
import { IconBrandGithub } from '@tabler/icons-react'

export default function Schema() {
  return (
    <div>
      <SetTitle text='Schema' />
      <Box maw={1000} mx='auto'>
        <Group position='apart'>
          <PageTitle>Schema</PageTitle>
          <Button
            variant='outline'
            component='a'
            href='https://github.com/blockScience/kms-schema'
            target='_blank'
            leftIcon={<IconBrandGithub />}
          >
            Edit schema on GitHub
          </Button>
        </Group>
        <Stack>
          <TypographyStylesProvider>
            <Text>
              This schema is an informal guide to help contextualise and coordinate how we use tags
              in the KMS. The hope is that it will evolve alongside our knowledgebase, so please{' '}
              <strong>open a pull request</strong> with changes to start a discussion! Opt to
              separate words with dashes where possible, so for example use{' '}
              <TagSpan>automated-regressor-market</TagSpan> instead of{' '}
              <TagSpan>AutomatedRegressorMarket</TagSpan> as this lets us ignore capitalisation when
              comparing tags. Acronyms and initialisms are fine, so feel free to use{' '}
              <TagSpan>AMM</TagSpan> if you prefer but try and coordinate with others to keep things
              consistent, we can always merge tags in bulk if we need to.
            </Text>
            <Title order={4}>Projects</Title>
            <Text>
              You can tag things with their project to make them easily discoverable. For example
              you could add tags for <TagSpan>cadCAD</TagSpan> or <TagSpan>CATs</TagSpan> or tag a
              client such as <TagSpan>filecoin</TagSpan>
            </Text>
            <Title order={4}>Purpose</Title>
            <Text>
              Add an intent or purpose to documents with tags like <TagSpan>publish</TagSpan> or{' '}
              <TagSpan>present</TagSpan>
            </Text>
            <Title order={4}>Audience</Title>
            <Text>
              Indicate an intended audience with tags like <TagSpan>technical</TagSpan> or{' '}
              <TagSpan>layman</TagSpan> (or perhaps suggest a kinder tag name!)
            </Text>
          </TypographyStylesProvider>
        </Stack>
      </Box>
    </div>
  )
}
