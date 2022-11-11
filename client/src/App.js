import React, { useEffect, useRef, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';

import Home from './pages/Home';
import Game from './pages/Game';

//https://keyholesoftware.com/2021/04/01/react-with-socket-io-messaging-app/
const socketEndpoint = "localhost:3001"

function App() {

  // const sTest = () => {
  //   console.log("wow");
    
  //   socket.current.emit("test", {
  //     body: "hi",
  //     senderId: socket.current.id,
  //   });
  // };


  return (
    <div className="App">
      <Game SEndpoint={socketEndpoint}/>
    </div>
  );
}

export default App;
