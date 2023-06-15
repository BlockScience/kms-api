import React, { Component } from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Stuff from "./views/Stuff";
import Contact from "./views/Contact";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>KMS SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/stuff" Component={Stuff} />
              <Route path="/contact" Component={Contact} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;