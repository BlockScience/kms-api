import { micromark } from 'micromark'
import sanitizeHtml from 'sanitize-html'

export function MD({
  markdown,
  preprocess,
  postprocess,
}: {
  markdown: string
  preprocess?: (input: string) => string
  postprocess?: (input: string) => string
}) {
  const md = preprocess?.(markdown) || markdown
  console.log(md)
  console.log(micromark(md))

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(postprocess?.(micromark(md)) || micromark(md)),
      }}
    />
  )
}
