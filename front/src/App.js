import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import SessionProvider from './components/sessions/SessionProvider';
import Routes from './components/Routes';

export default function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes />
      </Router>
    </SessionProvider>
  );
}