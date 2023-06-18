import { SetTitle as SetTitle } from "@/utilities/metadata";
import { Box } from "@mantine/core";
import { HomeHeroSection } from "@/components/homeHeroSection";

export default function Home() {
  return (
    <div>
      <SetTitle text="KMS" noPrefix />
      <Box maw={1000} mx='auto'>
        <HomeHeroSection />
      </Box>
    </div >
  );
}