import { PageTitle } from '@/components/typography';
import { SetTitle } from '@/utilities/metadata';
import { Box, Center, Skeleton, Space, Stack, Text } from '@mantine/core';

export default function Chat() {
  return (
    <div>
      <SetTitle text='Chat' />
      <Box maw={1000} mx='auto'>
        <Stack>
          <PageTitle>
            <Center>View for KMS-GPT</Center>
          </PageTitle>
          <Center>
            <Text
              size='sm'
              mt='md'
              ml='md'
              color='dimmed'
              tt='uppercase'
              fw={700}
            >
              Work in progress, Watch this space
            </Text>
          </Center>
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
        </Stack>
      </Box>
    </div>
  );
}
