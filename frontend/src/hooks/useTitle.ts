import { useEffect } from 'preact/hooks'

export function useTitle(title: string, prefix = true) {
  useEffect(() => {
    document.title = prefix ? 'KMS/' + title : title
  }, [])
}
