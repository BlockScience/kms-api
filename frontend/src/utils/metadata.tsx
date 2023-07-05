import { useEffect } from 'preact/hooks'

interface TitleProps {
  text: string
  noPrefix?: boolean
}

export function SetTitle(props: TitleProps) {
  useEffect(() => {
    document.title = props.noPrefix ? '' : 'KMS/' + props.text
  }, [])
  return <></>
}
