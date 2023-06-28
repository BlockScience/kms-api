import { useState } from 'preact/hooks'
import { MD } from '@/components/Markdown'
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

  return <MD markdown={markdown} />
}
