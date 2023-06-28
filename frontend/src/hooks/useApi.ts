import { useState, useEffect } from 'preact/hooks'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { api, auth0 } from '@/config'

interface ApiOptions {
  method?: string
  defer?: boolean
  data?: object
}

// TODO: Add caching to this hook

/**
 * Securely calls an API endpoint with the given options.
 * @param endpoint the endpoint to call
 * @param options set options like method, body, etc.
 */
export function useApi(endpoint: string, options?: ApiOptions) {
  const method = options?.method || 'GET'
  const data = options?.data || {}
  let defer = options?.defer || false

  const { getAccessTokenSilently } = useAuth0()
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState()
  const [refreshIndex, setRefreshIndex] = useState(0)

  const refresh = () => {
    defer = false
    setRefreshIndex(refreshIndex + 1)
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
        url: `${api.url}${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
        withCredentials: true,
      })
        .then((r) => {
          if (!cancelled) {
            setResult(r.data)
            setLoading(false)
            setLoaded(true)
          }
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

    let cancelled = false
    if (defer) {
      setResult(null)
      setLoading(false)
      setLoaded(false)
    } else {
      setLoading(true)
      getData()
    }
    return () => {
      cancelled = true
    }
  }, [getAccessTokenSilently, endpoint, refreshIndex])

  return { result, loading, loaded, error, refresh, setResult }
}
