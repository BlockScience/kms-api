import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Anchor, Image, Title } from '@mantine/core'

interface MarkdownParserProps {
  /** Filename must be a .md file in 'docs/' - do not include the extension */
  filename: string
}

export default function Markdown(props: MarkdownParserProps) {
  const [markdown, setState] = useState('')
  import(`../assets/docs/${props.filename}.md`)
    .then((module) =>
      fetch(module.default)
        .then((res) => res.text())
        .then((md) => {
          setState(md)
        })
        .catch((err) => console.log(err)),
    )
    .catch((err) => console.log(err))

  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => <Title order={2} {...props} />,
        h2: ({ ...props }) => <Title order={3} {...props} />,
        h3: ({ ...props }) => <Title order={4} {...props} />,
        h4: ({ ...props }) => <Title order={5} {...props} />,
        a: ({ ...props }) => <Anchor {...props} />,
        img: ({ ...props }) => <Image {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
