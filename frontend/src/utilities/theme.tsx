import { useMantineTheme } from '@mantine/core';

export function currentColorScheme() {
  return useMantineTheme().colorScheme;
}

export function useTheme() {
  return useMantineTheme();
}