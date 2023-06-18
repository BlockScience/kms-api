import { Component } from 'react';
import { AppShell } from '@mantine/core';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { Nav } from '@/components/navbar/Navbar';
import { GuidedTour } from '@/components/guidedTour';
import { ThemeProvider } from '@/ThemeProvider';
import { SpotlightProvider } from '@/SpotlightProvider';

import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Proposals from '@/views/Proposals';
import Schema from '@/views/Schema';
import Activity from '@/views/Activity';
import Search from '@/views/Search';
import Settings from '@/views/Settings';
import Chat from '@/views/Chat';
import NotFound from '@/views/NotFound';

const container = document.getElementById('app');
const root = container ? createRoot(container) : null;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <SpotlightProvider>
            <GuidedTour />
            <AppShell padding='md' fixed={true} navbar={<Nav />}>
              <div>
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
              </div>
            </AppShell>
          </SpotlightProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

root.render(<App />);
