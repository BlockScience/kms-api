import { SetTitle } from "@/utilities/metadata";
import { Timeline, Text, Title, Box, Divider } from "@mantine/core";
import { GitBranch, GitCommit, GitPullRequest, MessageDots } from "tabler-icons-react";

export default function Activity(props: any) {
  return (
    <div>
      <SetTitle text='Activity' />
      {/* <Box maw={800} mx='auto'> */}
      <Title order={2}>Activity</Title>
      <Divider my="xl" label="Label on the left" />
      <Timeline active={-1} bulletSize={18} lineWidth={2}>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
        </Timeline.Item>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
          <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
          <Text size="xs" mt={4}>2 hours ago ago</Text>
        </Timeline.Item>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
          <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
          <Text size="xs" mt={4}>2 hours ago ago</Text>
        </Timeline.Item>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
          <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
          <Text size="xs" mt={4}>2 hours ago ago</Text>
        </Timeline.Item>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
          <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
          <Text size="xs" mt={4}>2 hours ago ago</Text>
        </Timeline.Item>
        <Timeline.Item title="Tags changed">
          <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
          <Text size="xs" mt={4}>12 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal accepted">
          <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
          <Text size="xs" mt={4}>52 minutes ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Tags changed" lineVariant="dashed">
          <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
          <Text size="xs" mt={4}>1 hour ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Proposal submitted" >
          <Text color="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
          <Text size="xs" mt={4}>2 hours ago ago</Text>
        </Timeline.Item>
      </Timeline>
      {/* </Box> */}
    </div>
  );
}