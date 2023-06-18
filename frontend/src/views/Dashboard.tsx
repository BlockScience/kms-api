import { SetTitle } from "@/utilities/metadata";
import { Box, Button, Stack } from "@mantine/core";
import { PageTitle } from "@/components/typography";
import StatsGrid from "@/components/statsGrid";
import { LogTable } from "@/components/logTable";
import InlineTag from "@/components/inlineTag";

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
          ]} />
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

