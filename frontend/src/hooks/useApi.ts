import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { api, auth0 } from '@/config/config'

interface ApiOptions {
  method?: string
  // defer?: boolean
  data?: object
}

// TODO: Add caching to this hook
/**
 * Securely calls an API endpoint with the given options.
 * @param endpoint the endpoint to call
 * @param options set options like method, body, etc.
 */
export function useApi(endpoint: string, options?: ApiOptions) {
  const { getAccessTokenSilently } = useAuth0()

  const method = options?.method || 'GET'
  const [_endpoint, setEndpoint] = useState(endpoint)
  const [data, setData] = useState(options?.data || {})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const update = (data: object, endpoint: string = _endpoint) => {
    setData(data)
    if (endpoint !== _endpoint) setEndpoint(endpoint)
  }

  useEffect(() => {
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

    const getData = async () => {
      const token = await getToken()
      axios({
        method: method,
        url: `${api.url}${_endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
        withCredentials: true,
      })
        .then((r) => {
          setResult(r.data)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          if (error.response) {
            setError(error.response.data)
          } else {
            setError(error.message)
          }
        })
    }
    setLoading(true)
    getData()
  }, [getAccessTokenSilently, _endpoint, data])

  return { result, loading, error, update }
}
