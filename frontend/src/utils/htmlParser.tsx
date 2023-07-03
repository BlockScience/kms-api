import { Text } from '@mantine/core'

// This is a very simple parser that takes a string of HTML and returns a JSX element
// It should probably be replaced with a more robust solution, but it works for now.
export default function parseHtml(html: string): JSX.Element {
  const TAG_NAME = 'mark'
  const TAG_COLOR = 'blue'
  const re = RegExp(String.raw`<${TAG_NAME}>|<\/${TAG_NAME}>`, 'g')

  // Return a JSX element with the plaintext and TagSpan elements
  return (
    <>
      {html.split(re).map((substr, i) => {
        // Every second element (starting from index 0) is treated as plaintext
        if (i % 2 === 0) {
          return substr
        }
        // Every second element (starting from index 1) is turned into a tag
        else {
          return (
            <Text span color={TAG_COLOR} fw={700} key={i}>
              {substr}
            </Text>
          )
        }
      })}
    </>
  )
}
