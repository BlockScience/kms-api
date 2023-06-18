import { SetTitle } from '@/utilities/metadata';
import {
  TypographyStylesProvider,
  Box,
  Title,
  Text,
  Skeleton,
  Space,
  Button,
  Stack,
  Group,
} from '@mantine/core';
import InlineTag from '@/components/inlineTag';
import { PageTitle } from '@/components/typography';
import { IconBrandGithub } from '@tabler/icons-react';

export default function Schema() {
  const loading = false;
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
            View schema on GitHub
          </Button>
        </Group>
        {/* <Divider my="xs" label="Last updated 7 days ago" labelPosition="center" /> */}
        <Stack>
          <TypographyStylesProvider>
            {loading ? (
              <div>
                <Skeleton height={14} mt={20} radius='xl' width='15%' />
                <Skeleton height={14} mt={10} width='90%' radius='xl' />
                <Skeleton height={14} mt={10} width='70%' radius='xl' />
                <Space h='xl' />
                <Skeleton height={14} radius='xl' width='15%' />
                <Skeleton height={14} mt={10} radius='xl' />
                <Skeleton height={14} mt={10} width='90%' radius='xl' />
                <Skeleton height={14} mt={10} width='70%' radius='xl' />
                <Space h='xl' />
                <Skeleton height={14} radius='xl' width='15%' />
                <Skeleton height={14} mt={10} width='90%' radius='xl' />
                <Skeleton height={14} mt={10} radius='xl' />
                <Skeleton height={14} mt={10} width='90%' radius='xl' />
                <Skeleton height={14} mt={10} width='70%' radius='xl' />
              </div>
            ) : (
              <div>
                <Text>
                  This schema is an informal guide to help contextualise and
                  coordinate how we use tags in the KMS. The hope is that it
                  will evolve alongside our knowledgebase, so please{' '}
                  <strong>open a pull request</strong> with changes to start a
                  discussion! Opt to separate words with dashes where possible,
                  so for example use{' '}
                  <InlineTag>automated-regressor-market</InlineTag> instead of{' '}
                  <InlineTag>AutomatedRegressorMarket</InlineTag> as this lets
                  us ignore capitalisation when comparing tags. Acronyms and
                  initialisms are fine, so feel free to use{' '}
                  <InlineTag>AMM</InlineTag> if you prefer but try and
                  coordinate with others to keep things consistent, we can
                  always merge tags in bulk if we need to.
                </Text>
                <Title order={4}>Projects</Title>
                <Text>
                  You can tag things with their project to make them easily
                  discoverable. For example you could add tags for{' '}
                  <InlineTag>cadCAD</InlineTag> or <InlineTag>CATs</InlineTag>{' '}
                  or tag a client such as <InlineTag>filecoin</InlineTag>
                </Text>
                <Title order={4}>Purpose</Title>
                <Text>
                  Add an intent or purpose to documents with tags like{' '}
                  <InlineTag>publish</InlineTag> or{' '}
                  <InlineTag>present</InlineTag>
                </Text>
                <Title order={4}>Audience</Title>
                <Text>
                  Indicate an intended audience with tags like{' '}
                  <InlineTag>technical</InlineTag> or{' '}
                  <InlineTag>layman</InlineTag> (or perhaps suggest a kinder tag
                  name!)
                </Text>
              </div>
            )}
          </TypographyStylesProvider>
        </Stack>
      </Box>
    </div>
  );
}
