import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { api, auth0 } from '@/config'

interface ApiOptions {
  method?: string
  data?: object
  stream?: boolean
  /** If true, call will happen on first call to update() instead of immediately. */
  defer?: boolean
  onResult?: (result: any) => void
  onResultStream?: (result: any) => void
}

// TODO: Add caching to this hook
/**
 * Securely calls an API endpoint with the given options.
 * If the endpoint is null, the call will not be made. This is the same as setting deferred to true.
 * @param endpoint the endpoint to call.
 * @param options set options like method, body, etc.
 */
export function useApi(endpoint: string, options?: ApiOptions) {
  const { getAccessTokenSilently } = useAuth0()

  const method = options?.method || 'GET'
  const [_deferred, setDeferred] = useState(options?.defer || false)
  const [_endpoint, setEndpoint] = useState(endpoint)
  const [data, setData] = useState(options?.data || {})
  const [stream, setStream] = useState(options?.stream || false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [result_stream, setResultStream] = useState(null)
  const [error, setError] = useState(null)

  const update = (data: object, endpoint: string = _endpoint) => {
    setData(data)
    if (_endpoint !== endpoint) setEndpoint(endpoint)
    console.log('updating', data, endpoint, _endpoint)

    setDeferred(false)
  }

  useEffect(() => {
    if (!result || error) return
    if (options?.onResult) options.onResult(result)
  }, [result])

  useEffect(() => {
    if (!result_stream || error) return
    console.log(result_stream);
    if (options?.onResultStream) options.onResultStream(result_stream)
  }, [result_stream])

  useEffect(() => {
    console.log('useEffect', _deferred, _endpoint, `stream: ${stream}`)

    if (_deferred || !_endpoint) return
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0.audience,
          },
        })

        return accessToken
      } catch (error) {
        console.log(error.message)
      }
    }

    async function getStream() {
      console.log('streaming');
      const resp = await fetch('http://127.0.0.1:8000/user/luke/chat/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: 'what is your purpose'
        })
      })

      const reader = resp.body.getReader();

      setResultStream([]);

      while (true) {
        const { value, done } = await reader.read();
        const decoder = new TextDecoder('utf-8');

        if (done) {
          break;
        }

        if (value) {
          let data = decoder.decode(value, { stream: true })
          setResultStream(array => [...array, data]);
        }

      }
    }

    const getData = async () => {
      const token = await getToken()

      fetch(`${api.url}${_endpoint}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: method != 'GET' ? JSON.stringify(data) : null,
        credentials: 'include'
      })
        .then(resp => {
          if (!stream) return resp.json();
        })
        .then(data => {
          setResult(data)
          setLoading(false);
        })

      // .catch((error) => {
      //   setLoading(false)
      //   if (error.response) {
      //     setError(error.response.data)
      //   } else {
      //     setError(error.message)
      //   }
      // })
    }
    setLoading(true)

    if (stream) {
      getStream()
    } else {
      getData()
    }

    console.log('calling api', _endpoint)
  }, [getAccessTokenSilently, _endpoint, data, _deferred])

  return { result, result_stream, loading, error, update }
}
