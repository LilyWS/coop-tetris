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

const socketEndpoint = "localhost:3001"

function App() {

  useEffect(() => {
    const socket = io(socketEndpoint);
    socket.on("test", () => {
      console.log("hihihihihihi!!!!");
    })
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
