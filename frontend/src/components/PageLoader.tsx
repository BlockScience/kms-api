import {
  Center,
  Title,
  LoadingOverlay,
  Button,
  Group,
  Box,
  Text,
} from '@mantine/core';

export default function PageLoader() {
  return (
    <>
      <Box maw={400} pos='relative'>
        <LoadingOverlay visible overlayBlur={2}></LoadingOverlay>
      </Box>
    </>
  );
}
