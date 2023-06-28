import { useApi } from '@/hooks/useApi'

export default function ApiTestButton() {
  const opts = {
    method: 'POST',
    data: { test: 'test' },
  }
  const { result, loaded } = useApi('/test')

  return (
    loaded && (
      <div>
        <h3>API stuff!</h3>
        {result ? <p>{JSON.stringify(result)}</p> : 'No result :('}
      </div>
    )
  )
}
