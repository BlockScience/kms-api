// @ts-nocheck

import { useFetch } from 'react-async'
import { auth0Config } from '@/config'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'

// const Test5 = () => {
//   const headers = {
//     Authentication: 'Bearer test',
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   }
//   const options = {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     credentials: 'include', // include, *same-origin, omit
//     // body: data ? JSON.stringify(data) : null, // body data type must match "Content-Type" header
//   }

//   const { data, error, isPending, run } = useFetch('http://127.0.0.1:8000', { headers }, options)

//   const [email, setEmail] = useState('')
//   const handleSubmit = (event) => {
//     event.preventDefault()
//     run({ body: JSON.stringify({ email }) })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
//       <button type='submit' disabled={isPending}>
//         Subscribe
//       </button>
//       {error && <p>{error.message}</p>}
//     </form>
//   )
// }
// const tkn = await getAccessToken()

function Test4() {
  const [token, setToken] = useState(null)
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function getToken() {
      const t = await getAccessTokenSilently({
        authorizationParams: {
          audience: auth0Config.api_url,
        },
      })
      setToken(t)
    }
    getToken()
  }, [])
  const headers = {
    Authentication: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  // const optionsPost = {
  //   method: 'POST',
  //   credentials: 'include',
  //   body: JSON.stringify({
  //     faaefaef: 'afaef fdthfthfhfyj fyj fyjf yjfy jfy jfyj fyj fyj fyj fyj fyj ',
  //   }),
  // }
  const optionsGet = { method: 'GET', credentials: 'include' }

  const extras = { defer: true }
  const { data, error, isPending, run } = useFetch(
    `${auth0Config.api_url}/test`,
    { ...optionsGet, headers: headers },
    extras,
  )

  const handleFetch = () => {
    run()
  }

  return (
    <>
      <button type='submit' onClick={handleFetch} disabled={isPending}>
        get data
      </button>
      {error && <p>{JSON.stringify(error)}</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </>
  )
}

export default function ApiTestButton() {
  return <Test4 />
}
