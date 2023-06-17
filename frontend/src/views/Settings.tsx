import { SetTitle } from "@/utilities/metadata";
import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput, Title } from "@mantine/core";


export default function Settings() {
  const settings = useForm({
    initialValues: {
      resultsPerPage: 15,
      contextPerResult: 20,
      validate: {
        resultsPerPage: (value: any) => (value > 0 ? null : "Results must be greater than 0"),
        contextPerResult: (value: any) => (value > 4 ? null : 'Context must include at least 5 words'),
      },
    },
  });
  return (
    <div>
      <SetTitle text='Settings' />
      <Box maw={500} mx="auto">
        <Title order={2}>Settings</Title>
        <form onSubmit={settings.onSubmit((values) => console.log(values))}>
          <NumberInput
            min={0}
            max={100}
            label="Search results per page"
            {...settings.getInputProps('resultsPerPage')}
          />
          <NumberInput
            min={5}
            max={100}
            label="Number of words per result"
            {...settings.getInputProps('contextPerResult')}
          />

          {/* <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...settings.getInputProps('termsOfService', { type: 'checkbox' })}
          /> */}

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}