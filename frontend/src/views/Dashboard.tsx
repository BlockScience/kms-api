import { SetTitle } from "@/utilities/metadata";
import { Box, Button, Stack, Paper, Group, Text, Badge, rem } from "@mantine/core";
import { PageTitle } from "@/components/typography";
import StatsGrid from "@/components/statsGrid";
import { LogTable } from "@/components/logTable";
import InlineTag from "@/components/inlineTag";

function TagSet(props: { label: string, data: string[] }) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Text size="xs" fw={700} color="dimmed" tt="uppercase">
          {props.label}
        </Text>
      </Group>

      <Group align="flex-end" spacing={rem(5)} mt={25}>
        {props.data.map((s) => <Badge radius="sm">{s}</Badge>)}
      </Group>
    </Paper>
  )
}

export default function Dashboard() {
  return (
    <div>
      <SetTitle text='Dashboard' />
      <Box maw={1000} mx='auto'>
        <PageTitle>Dashboard</PageTitle>
        <Stack>
          <StatsGrid data={[
            { title: "Tags Added", value: '17', diff: -7 },
            { title: "Tags Removed", value: '27', diff: 14 },
            { title: "Queries Completed", value: '31', diff: 12 },
            { title: "Proposals Submitted", value: '3', diff: 1 },
            { title: "Proposals Resolved", value: '3', diff: 1 },
            { title: "Objects Added", value: '149', diff: 29 },
            { title: "Objects Updated", value: '1520', diff: -11 },
          ]} />
          <TagSet label="Tags in knowledgebase" data={["foo", "bar", "baz", "foo", "baaar", "barsz", "foo", "baadr", "bafsz", "fooasf", "bar", "baz"]} />
          <TagSet label="Tags in schema" data={["foo", "bar", "baz"]} />
          <TagSet label="Tags in schema & knowledgebase" data={["foo", "bar", "baz"]} />
          <LogTable data={[
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8277e0910d750195b448797616e091ad", user: "tealc@sgc.com", data: <div><InlineTag color="green">kms</InlineTag>&nbsp;<InlineTag color="red">cadcad</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "8fa14cdd754f91cc6554c9e71929cce7", user: "daniel@sgc.com", data: <div><InlineTag color="green">fluff</InlineTag>&nbsp;<InlineTag color="green">rock</InlineTag></div>, time: "yesterday" },
            { event: "Tags Changed", object: "d86ec7ac67cf45f6205a8ed9080e6fc1", user: "steve@sgc.com", data: <div><InlineTag color="green">tree</InlineTag>&nbsp;<InlineTag color="red">stick</InlineTag></div>, time: "yesterday" },
          ]} />
          <Button onClick={() => fetch('/api').then(resp => resp.json()).then(data => { console.log(data.message) })}>Summon some data!</Button>
        </Stack>
      </Box>
    </div >
  );
}

