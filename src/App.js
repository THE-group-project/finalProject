import React, { Component } from 'react';
import './App.css';
import LogoBranding from './components/LogoBranding';
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <div>
        <LogoBranding />
        <Login />
        <SignUp />
      </div>
    );
  }
}

export default App;
