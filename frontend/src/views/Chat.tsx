import { PageTitle } from "@/components/typography";
import { SetTitle } from "@/utilities/metadata";
import { Box, Center } from "@mantine/core";

export default function Chat() {
  return (
    <div>
      <SetTitle text='Chat' />
      <Box maw={1000} mx="auto">
        <PageTitle>
          <Center>
            Work-In-Progress View for KMS-GPT
          </Center>
        </PageTitle>
      </Box>
    </div>
  );
}