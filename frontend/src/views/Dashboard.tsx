import { SetTitle } from "@/utilities/metadata";
import { Button, Title } from "@mantine/core";

export default function Dashboard() {
  return (
    <div>
      <SetTitle text='Dashboard' />
      <Title order={2}>Dashboard</Title>
      <Button onClick={() => fetch('/api').then(resp => resp.json()).then(data => { alert(data.message) })}>Summon some data!</Button>
    </div>
  );
}

