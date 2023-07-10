import 'preact/debug' // Must be the first import
import { render } from 'preact'
import { AppShell } from '@mantine/core'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ThemeProvider, Auth0RedirectProvider } from '@/components/providers'

import { Sidebar } from '@/components/sidebar'
import { Notifications } from '@mantine/notifications'
import { Shortcuts } from '@/components/Shortcuts'
import { AuthRequired } from '@/components/ProtectedRoute'
import { Spotlight } from '@/components/spotlight'
import { PaddedShell } from '@/components/PaddedShell'

import lazy from 'preact-lazy'
const Home = lazy(() => import('@/routes/Home'))
const Dashboard = lazy(() => import('@/routes/Dashboard'))
const Governance = lazy(() => import('@/routes/Governance'))
const Schema = lazy(() => import('@/routes/Schema'))
const Activity = lazy(() => import('@/routes/Activity'))
const Search = lazy(() => import('@/routes/Search'))
const Settings = lazy(() => import('@/routes/Settings'))
const LLMChat = lazy(() => import('@/routes/LLMChat'))
const NotFound = lazy(() => import('@/routes/NotFound'))
const Documentation = lazy(() => import('@/routes/Documentation'))
const Graph = lazy(() => import('@/routes/Graph'))
const QueryTest = lazy(() => import('@/routes/QueryTest'))

function App() {
  return (
    <BrowserRouter>
      <Auth0RedirectProvider>
        <ThemeProvider>
          <AuthRequired component={Protected} />
        </ThemeProvider>
      </Auth0RedirectProvider>
    </BrowserRouter>
  )
}

function Protected() {
  return (
    <Spotlight>
      <Shortcuts />
      <Notifications />
      <AppShell padding={0} fixed navbar={<Sidebar />}>
        <Routes>
          <Route element={<PaddedShell />}>
            <Route path='/' Component={Home} />
            <Route path='/governance' Component={Governance} />
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/schema' Component={Schema} />
            <Route path='/activity' Component={Activity} />
            <Route path='/search' Component={Search} />
            <Route path='/settings' Component={Settings} />
            <Route path='/chat' Component={LLMChat} />
            <Route path='/query-test' Component={QueryTest} />
          </Route>
          <Route path='/graph' Component={Graph} />
          <Route path='/docs' Component={Documentation} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </AppShell>
    </Spotlight>
  )
}

render(<App />, document.body)
