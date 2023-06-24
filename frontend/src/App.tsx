// Must be the first import
import 'preact/debug'
import { render } from 'preact'
import { AppShell, Box, ScrollArea } from '@mantine/core'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { auth0Config } from '@/configs/auth'
import { ThemeProvider, SpotlightProvider, Auth0RedirectProvider } from '@/components/providers'

import { PageLoading } from '@/components/PageLoading'
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

const DefaultShell = () => {
  return (
    <ScrollArea h='100vh'>
      <Box p='md'>
        <Outlet />
      </Box>
    </ScrollArea>
  )
}

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <PageLoading />,
  })
  return <Component />
}

function App() {
  return (
    <BrowserRouter>
      <Auth0RedirectProvider
        domain={auth0Config.domain}
        clientId={auth0Config.clientID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          prompt: 'login',
        }}
      >
        <ThemeProvider>
          <ProtectedRoute component={Protected} />
        </ThemeProvider>
      </Auth0RedirectProvider>
    </BrowserRouter>
  )
}

function Protected() {
  return (
    <SpotlightProvider>
      <OnboardingTour />
      <Shortcuts />
      <Notifications />
      <AppShell padding={0} fixed navbar={<Sidebar />}>
        <Routes>
          <Route element={<DefaultShell />}>
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

render(<App />, document.body)
