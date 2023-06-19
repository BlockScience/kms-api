import { SetTitle as SetTitle } from '@/utilities/metadata';
import { Box } from '@mantine/core';
import HomeWelcomeSection from '@/components/home/SectionWelcome';
import HomeArchitectureSection from '@/components/home/SectionArchitecture';

export default function Home() {
  return (
    <>
      <SetTitle text='KMS' noPrefix />
      <Box maw={1000} mx='auto'>
        <HomeWelcomeSection />
        <HomeArchitectureSection />
      </Box>
    </>
  );
}
