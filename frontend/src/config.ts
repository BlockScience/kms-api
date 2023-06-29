const DEV = import.meta.env.MODE === 'development'

export const auth0 = {
  domain: 'auth.kms-beta.block.science',
  audience: 'https://127.0.0.1:8000',
  clientID: 'BVQY76IBcTjxg0TKDrAXMcM5pL6OW8y2',
  issuerBaseURL: 'something',
}

export const api = {
  url: DEV ? 'https://localhost:8000' : 'api',
}
