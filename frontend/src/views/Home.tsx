import { SetTitle as SetTitle } from "@/utilities/metadata";
import { Box } from "@mantine/core";
import HomeWelcomeSection from "@/components/homeWelcome";
import HomeArchitectureSection from "@/components/homeArchitecture";

export default function Home() {
  return (
    <div>
      <SetTitle text="KMS" noPrefix />
      <Box maw={1000} mx='auto'>
        <HomeWelcomeSection />
        <HomeArchitectureSection />
      </Box>
    </div >
  );
}