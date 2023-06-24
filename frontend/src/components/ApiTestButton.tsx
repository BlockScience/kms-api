import { auth0Config } from '@/config'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'preact/hooks'

const fetchData = async (token: string) => {
  const res = await fetch('http://127.0.0.1:8000/test', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  return res.json()
}

export default function ApiTestButton() {
  const [token, setToken] = useState('')
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function getToken() {
      const t = await getAccessTokenSilently({
        authorizationParams: {
          audience: auth0Config.audience,
        },
      })
      setToken(t)
    }
    getToken()
  }, [])

  const query = useQuery({ queryKey: ['test'], queryFn: () => fetchData(token) })
  console.log(query.data)

  return (
    <>
      <button type='submit'>get data</button>
      <p>{query.data ? JSON.stringify(query.data) : 'nothing'}</p>
    </>
  )
}
