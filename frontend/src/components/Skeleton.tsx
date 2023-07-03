import { Box, Skeleton, Stack } from '@mantine/core'

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

export function Paragraphs(lines: number[]) {
  const width = (length, i) => {
    return i + 1 === length ? randomRange(30, 90) + '%' : '100%'
  }
  return lines.map((length, i) => (
    <Box key={i} mb={20}>
      {[...Array(length)].map((e, i) => (
        <Skeleton key={i} height={14} mb={5} radius='xl' width={width(length, i)} />
      ))}
    </Box>
  ))
}

export function CardsSkeleton(cards: number[]) {
  return cards.map((height, i) => <Skeleton key={i} height={height} radius='md' />)
}
