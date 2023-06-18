import { Stack, Text, Title, Space, Box } from "@mantine/core";
import { ProposalCard } from "@/components/proposalCard";
import { SetTitle } from "@/utilities/metadata";
import { PageTitle } from "@/components/typography";

export default function Proposals() {
  return (
    <div>
      <SetTitle text='Proposals' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Proposals</PageTitle>
        <Stack>
          <ProposalCard title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="pending" resolvedBy={null} />
          <ProposalCard title="Rename 'cats' to 'CATs'" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="approved" resolvedBy='steve@block.science' />
          <ProposalCard title="Do another thing" description="lorum ipsum dolor sit amet dolor sit amet dolor sit amet" author="orion@block.science" operations={5n} status="rejected" resolvedBy='steve@block.science' />
        </Stack>
      </Box>
    </div>
  );
}