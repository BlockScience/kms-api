const DEV = import.meta.env.MODE === 'development'

export const auth0 = {
  domain: 'dev-67fgpygy2qoenl7r.us.auth0.com',
  audience: 'https://127.0.0.1:8000',
  clientID: 'BVQY76IBcTjxg0TKDrAXMcM5pL6OW8y2',
  issuerBaseURL: 'something',
}

export const api = {
  url: DEV ? 'https://localhost:8000' : 'api',
}
