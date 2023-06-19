import { Component } from 'react';
import { AppShell } from '@mantine/core';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { Nav } from '@/components/navbar/Navbar';
import { GuidedTour } from '@/components/guidedTour';
import { ThemeProvider } from '@/ThemeProvider';
import { SpotlightProvider } from '@/SpotlightProvider';
import { Auth0Provider } from '@auth0/auth0-react';

import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Proposals from '@/views/Proposals';
import Schema from '@/views/Schema';
import Activity from '@/views/Activity';
import Search from '@/views/Search';
import Settings from '@/views/Settings';
import Chat from '@/views/Chat';
import NotFound from '@/views/NotFound';
import { AuthenticationGuard } from '@/components/AuthenticationGuard';

const container = document.getElementById('app');
const root = container ? createRoot(container) : null;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Auth0Provider
          domain='dev-67fgpygy2qoenl7r.us.auth0.com'
          clientId='BVQY76IBcTjxg0TKDrAXMcM5pL6OW8y2'
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <ThemeProvider>
            <SpotlightProvider>
              <GuidedTour />
              <AppShell padding='md' fixed={true} navbar={<Nav />}>
                <div>
                  <Routes>
                    <Route path='/' Component={Home} />
                    <Route
                      path='/dashboard'
                      element={<AuthenticationGuard component={Dashboard} />}
                    />
                    <Route
                      path='/proposals'
                      element={<AuthenticationGuard component={Proposals} />}
                    />
                    <Route
                      path='/schema'
                      element={<AuthenticationGuard component={Schema} />}
                    />
                    <Route
                      path='/activity'
                      element={<AuthenticationGuard component={Activity} />}
                    />
                    <Route
                      path='/search'
                      element={<AuthenticationGuard component={Search} />}
                    />
                    <Route
                      path='/settings'
                      element={<AuthenticationGuard component={Settings} />}
                    />
                    <Route
                      path='/chat'
                      element={<AuthenticationGuard component={Chat} />}
                    />
                    <Route path='*' element={<NotFound />} />
                  </Routes>
                </div>
              </AppShell>
            </SpotlightProvider>
          </ThemeProvider>
        </Auth0Provider>
        ,
      </BrowserRouter>
    );
  }
}

if (root) {
  root.render(<App />);
}
