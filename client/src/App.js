import React, { useEffect, useRef, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';

import Header from './components/Header';

import Home from './pages/Home';
import Game from './pages/Game';

//https://keyholesoftware.com/2021/04/01/react-with-socket-io-messaging-app/
const socketEndpoint = "localhost:3001"

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/play/:matchID" element={<Game SEndpoint={socketEndpoint}/>}/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
