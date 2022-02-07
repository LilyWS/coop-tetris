import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';

import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (

    <div className="App">
    <header className="app-header">
      React Chat
    </header>
    { socket ? (
      <div className="chat-container">
        <p>Hi!</p>
      </div>
    ) : (
      <div>Not Connected</div>
    )}
  </div>
    // <Router>
    //   <Header />
    //   <Route exact path="/">
    //     <Home />
    //   </Route>
    //   <Route exact path="/play">
    //     <Game />
    //   </Route>
      
    // </Router>
  );
}

export default App;
