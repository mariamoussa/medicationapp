import React from 'react';
import SessionProvider from './components/sessions/SessionProvider';
import Routes from './components/Routes';
import { withRouter } from 'react-router-dom';
import './App.css';

function App(props) {
  return (
    <SessionProvider>
      <Routes {...props} />
    </SessionProvider>
  );
}

export default withRouter(App)