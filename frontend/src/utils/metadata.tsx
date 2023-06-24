import { Helmet } from 'react-helmet';

interface TitleProps {
  text: string
  noPrefix?: boolean
}

export function SetTitle(props: TitleProps) {
  return (
    <Helmet>
      <title>{props.noPrefix ? '' : 'KMS/'}{props.text}</title>
    </Helmet>
  )
}