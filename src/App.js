import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Results from "./pages/Results";
import Signup from "./pages/Signup";
import Profile from './pages/Profile';
import Navbar from "./components/Navbar/Navbar";
import Wrapper from "./components/Wrapper/Wrapper";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Wrapper>
            <Route exact path="/" component={Home} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;
