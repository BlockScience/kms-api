import { useLocation, useSearchParams } from "react-router-dom";
import { SetTitle } from "@/utilities/metadata";
import { Pagination, Stack, Paper, Container } from "@mantine/core";

export default function Search() {
  const location = useLocation();
  // const [_, setSearchParams] = useSearchParams();
  // setSearchParams({ q: location.state.q });
  return (
    <div>
      <SetTitle text='Search' />
      <Stack maw={1000} mx='auto'>
        <Paper>Search result 1</Paper>
        <Paper>Search result 2</Paper>
        <Paper>Search result 3</Paper>
        <Container>
          <Pagination total={10} />
        </Container>
      </Stack>
    </div>
  );
}