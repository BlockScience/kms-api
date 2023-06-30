import 'preact/debug' // Must be the first import
import { render } from 'preact'
import { AppShell, Box, ScrollArea } from '@mantine/core'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import { ThemeProvider, SpotlightProvider, Auth0RedirectProvider } from '@/components/providers'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { Sidebar } from '@/components/sidebar'
import { Notifications } from '@mantine/notifications'
import { OnboardingTour } from '@/components/OnboardingTour'
import { Shortcuts } from '@/components/Shortcuts'
import { AuthRequired } from '@/components/ProtectedRoute'

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
import QueryTest from '@/routes/QueryTest'

const queryClient = new QueryClient()

const DefaultShell = () => {
  return (
    // TODO: Replace with custom scroll area
    // @ts-ignore
    <ScrollArea h='100vh'>
      <Box p='md'>
        <Outlet />
      </Box>
    </ScrollArea>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Auth0RedirectProvider>
        <ThemeProvider>
          <AuthRequired component={Protected} />
          {/* <Protected /> */}
        </ThemeProvider>
      </Auth0RedirectProvider>
    </BrowserRouter>
  )
}

function Protected() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path='/query-test' Component={QueryTest} />
            </Route>
            <Route path='/experimental' Component={Graph} />
            <Route path='/docs' Component={Documentation} />
            <Route path='*' Component={NotFound} />
          </Routes>
        </AppShell>
      </SpotlightProvider>
    </QueryClientProvider>
  )
}

render(<App />, document.body)
