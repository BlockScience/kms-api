import { Component } from 'react'
import { AppShell } from '@mantine/core'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import { Nav } from '@/components/navbar/Navbar'
import { GuidedTour } from '@/components/guidedTour'
import { ThemeProvider } from '@/ThemeProvider'
import { SpotlightProvider } from '@/SpotlightProvider'
import { Auth0Provider } from '@auth0/auth0-react'

import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import Proposals from '@/views/Proposals'
import Schema from '@/views/Schema'
import Activity from '@/views/Activity'
import Search from '@/views/Search'
import Settings from '@/views/Settings'
import Chat from '@/views/Chat'
import NotFound from '@/views/NotFound'
import Login from '@/views/Login'

const container = document.getElementById('app')
const root = container ? createRoot(container) : null

function guardedApp() {
  return (
    <SpotlightProvider>
      <GuidedTour />
      <AppShell padding='md' fixed={true} navbar={<Nav />}>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/proposals' Component={Proposals} />
          <Route path='/schema' Component={Schema} />
          <Route path='/activity' Component={Activity} />
          <Route path='/search' Component={Search} />
          <Route path='/settings' Component={Settings} />
          <Route path='/chat' Component={Chat} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AppShell>
    </SpotlightProvider>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Auth0Provider
          domain='dev-67fgpygy2qoenl7r.us.auth0.com'
          clientId='BVQY76IBcTjxg0TKDrAXMcM5pL6OW8y2'
          authorizationParams={{
            redirect_uri: window.location.origin,
            prompt: 'login',
            // audience: 'https://dev-67fgpygy2qoenl7r.us.auth0.com/api/v2/',
            // scope: 'read:current_user update:current_user_metadata',
          }}
        >
          <ThemeProvider>
            {/* <Routes>
              <Route path='/login' Component={Login} />
            </Routes> */}
            <AuthenticationGuard component={guardedApp} />
          </ThemeProvider>
        </Auth0Provider>
        ,
      </BrowserRouter>
    )
  }
}

if (root) {
  root.render(<App />)
}
