import { Title, Text, Image, Anchor } from '@mantine/core'
import { TagSpan } from '../TagSpan'

export const common = {
  p: ({ children }) => <Text pt={4}>{children}</Text>,
  h1: ({ children }) => (
    <Title mt={15} order={1}>
      {children}
    </Title>
  ),
  h2: ({ children }) => (
    <Title mt={15} order={2}>
      {children}
    </Title>
  ),
  h3: ({ children }) => (
    <Title mt={15} order={3}>
      {children}
    </Title>
  ),
  h4: ({ children }) => (
    <Title mt={15} order={4}>
      {children}
    </Title>
  ),
  img: ({ src }) => <Image my={20} src={src} />,
  a: ({ href, children }) => <Anchor href={href}>{children}</Anchor>,
}
