import type { ComponentChildren } from 'preact'

type Props = {
  children: ComponentChildren
}

export function ComponentWithChildren(props: Props) {
  return <div>{props.children}</div>
}
