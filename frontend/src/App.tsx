import { AppShell, Box, ScrollArea, px, rem } from '@mantine/core'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'

import { Notifications } from '@mantine/notifications'
import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import { OnboardingTour } from '@/components/OnboardingTour'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { CustomSpotlightProvider } from '@/components/providers/CustomSpotlightProvider'
import Sidebar from '@/components/sidebar'

import { auth0Config } from '@/configs/auth'

import Home from '@/routes/Home'
import Dashboard from '@/routes/Dashboard'
import Governance from '@/routes/Governance'
import Schema from '@/routes/Schema'
import Activity from '@/routes/Activity'
import Search from '@/routes/Search'
import Settings from '@/routes/Settings'
import Chat from '@/routes/Chat'
import NotFound from '@/routes/NotFound'
import Documentation from '@/routes/Documentation'
import Shortcuts from '@/components/Shortcuts'
import Graph from '@/routes/Graph'

const InnerShellContext = () => {
  return (
    <ScrollArea h='100vh'>
      <Box p='md'>
        <Outlet />
      </Box>
    </ScrollArea>
  )
}

const container = document.getElementById('app')
const root = container ? createRoot(container) : null

function guardedContent() {
  return (
    <CustomSpotlightProvider>
      <OnboardingTour />
      <Shortcuts />
      <Notifications />
      <AppShell padding={0} fixed navbar={<Sidebar />}>
        <Routes>
          <Route element={<InnerShellContext />}>
            <Route path='/' Component={Home} />
            <Route path='/governance' Component={Governance} />
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/schema' Component={Schema} />
            <Route path='/activity' Component={Activity} />
            <Route path='/search' Component={Search} />
            <Route path='/settings' Component={Settings} />
            <Route path='/chat' Component={Chat} />
          </Route>
          <Route path='/experimental' Component={Graph} />
          <Route path='/docs' Component={Documentation} />
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
