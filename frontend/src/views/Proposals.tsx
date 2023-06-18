import { Stack, Box } from "@mantine/core";
import { Proposal } from "@/components/proposalCard";
import { SetTitle } from "@/utilities/metadata";
import { PageTitle } from "@/components/typography";

export default function Proposals() {
  return (
    <div>
      <SetTitle text='Proposals' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Proposals</PageTitle>
        <Stack>
          <Proposal title="Rename 'cats' to 'CATs'" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <Proposal title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={81n} status="pending" resolvedBy={null} />
          <Proposal title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={129n} status="pending" resolvedBy={null} />
          <Proposal title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={3n} status="pending" resolvedBy={null} />
          <Proposal title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <Proposal title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <Proposal title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={14n} status="pending" resolvedBy={null} />
          <Proposal title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={25n} status="pending" resolvedBy={null} />
          <Proposal title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={31n} status="approved" resolvedBy='steve@block.science' />
          <Proposal title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={32n} status="rejected" resolvedBy='steve@block.science' />
        </Stack>
      </Box>
    </div>
  );
}