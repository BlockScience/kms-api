import { Component } from "react";
import { Stack, Text, Title, Space } from "@mantine/core";
import { Helmet } from "react-helmet";
import { ProposalCard } from "@/components/proposalCard";

class Proposals extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>KMS/Proposals</title>
        </Helmet>
        <Title order={2}>Proposals</Title>
        <Space h='sm' />
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
      </div>
    );
  }
}

export default Proposals;