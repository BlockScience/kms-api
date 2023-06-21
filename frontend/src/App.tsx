import { AppShell, Box } from '@mantine/core'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

import { Notifications } from '@mantine/notifications'
import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import { GuidedTour } from '@/components/guidedTour'
import { ThemeProvider } from '@/ThemeProvider'
import { CustomSpotlightProvider } from '@/CustomSpotlightProvider'
import { Nav } from '@/components/navbar/Navbar'

import { auth0Config } from '@/config'

import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import Proposals from '@/views/Proposals'
import Schema from '@/views/Schema'
import Activity from '@/views/Activity'
import Search from '@/views/Search'
import Settings from '@/views/Settings'
import Chat from '@/views/Chat'
import NotFound from '@/views/NotFound'
import Documentation from '@/views/Documentation'
import Shortcuts from '@/components/Shortcuts'
import Morphic from '@/views/MorphicExperimental'

const InnerShellContext = () => {
  return (
    <Box p='md'>
      <Outlet />
    </Box>
  )
}

const container = document.getElementById('app')
const root = container ? createRoot(container) : null

function guardedContent() {
  return (
    <CustomSpotlightProvider>
      <GuidedTour />
      <Shortcuts />
      <Notifications />
      <AppShell padding={0} fixed={true} navbar={<Nav />}>
        <Routes>
          <Route element={<InnerShellContext />}>
            <Route path='/' Component={Home} />
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/proposals' Component={Proposals} />
            <Route path='/schema' Component={Schema} />
            <Route path='/activity' Component={Activity} />
            <Route path='/search' Component={Search} />
            <Route path='/settings' Component={Settings} />
            <Route path='/chat' Component={Chat} />
          </Route>
          <Route path='/docs' Component={Documentation} />
          <Route path='/experimental' Component={Morphic} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </AppShell>
    </CustomSpotlightProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      {/* <AuthenticationGuard component={guardedContent}></AuthenticationGuard> */}
      {guardedContent()}
    </ThemeProvider>
  )
}

if (root) {
  root.render(
    <BrowserRouter>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          prompt: 'login',
          // audience: 'https://dev-67fgpygy2qoenl7r.us.auth0.com/api/v2/',
          // scope: 'read:current_user update:current_user_metadata',
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>,
  )
}
