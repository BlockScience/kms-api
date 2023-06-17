import { useMantineTheme } from '@mantine/core';

export function currentColorScheme() {
  return useMantineTheme().colorScheme;
}

export function theme() {
  return useMantineTheme();
}