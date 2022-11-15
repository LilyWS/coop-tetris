import React from 'react';
import Header from '../components/Header';

import { useMutation } from '@apollo/client';
import { CREATE_MATCH } from '../utils/mutations';

const Home = () => {
  
  const [createMatchMutation, { error, data }] = useMutation(CREATE_MATCH);

  const createMatch = async () => {
    const { data } = await createMatchMutation({
      variables: { user: "testUseer" },
    });
    console.log(data);
  }

  return (
    <main>
        <h1>CPTetris</h1>
        <button onClick={createMatch}>Create Match</button>
    </main>
  );
};

export default Home;