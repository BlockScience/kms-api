import { render } from 'preact'
import { AppShell, Box, ScrollArea } from '@mantine/core'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { auth0Config } from '@/configs/auth'
import { ThemeProvider, SpotlightProvider } from '@/components/providers'
import { AuthenticationGuard } from '@/components/AuthenticationGuard'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Sidebar } from '@/components/sidebar'
import { Notifications } from '@mantine/notifications'
import { OnboardingTour } from '@/components/OnboardingTour'
import { Shortcuts } from '@/components/Shortcuts'

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

function GuardedContent() {
  return (
    <SpotlightProvider>
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
    </SpotlightProvider>
  )
}

function App() {
  return (
    // <ErrorBoundary>
    <BrowserRouter>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          prompt: 'login',
        }}
      >
        <ThemeProvider>
          {/* <AuthenticationGuard> */}
          <GuardedContent />
          {/* </AuthenticationGuard> */}
          {/* {GuardedContent} */}
        </ThemeProvider>
      </Auth0Provider>
      {/* </ErrorBoundary> */}
    </BrowserRouter>
  )
}

render(<App />, document.body)
