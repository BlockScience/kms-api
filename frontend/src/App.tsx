import { Component } from "react";
import { AppShell } from '@mantine/core';
import { SpotlightProvider } from '@mantine/spotlight';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Nav } from './_nav';
import { ThemeProvider } from './ThemeProvider';
import { Spotlight } from "./Spotlight";

import Home from "./views/Home";
import Console from "./views/Console";
import Proposals from "./views/Proposals";
import Schema from "./views/Schema";
import Notifications from "./views/Notifications";
import Search from "./views/Search"

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Spotlight>
          <BrowserRouter>
            <AppShell padding="md" fixed={false} navbar={<Nav />}>
              <div>
                <Routes>
                  <Route path="/" Component={Home} />
                  <Route path="/console" Component={Console} />
                  <Route path="/proposals" Component={Proposals} />
                  <Route path="/schema" Component={Schema} />
                  <Route path="/notifications" Component={Notifications} />
                  <Route path="/search" Component={Search} />
                </Routes>
              </div>
            </AppShell>
          </BrowserRouter>
        </Spotlight>
      </ThemeProvider>
    );
  }
}

export default App;