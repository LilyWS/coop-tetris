import React from 'react';
import { useNavigate } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { CREATE_MATCH } from '../utils/mutations';

import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();

  const [createMatchMutation, { error, data }] = useMutation(CREATE_MATCH);

  const createMatch = async () => {
    const { data } = await createMatchMutation({
      variables: { user: "testUseer" },
    });

    let path = `play/${data.createMatch.queryID}`;
    console.log(path);
    navigate(path)
  }

  return (
    <main>
        <h1>CPTetris</h1>
        <button onClick={createMatch}>Create Match</button>
    </main>
  );
};

export default Home;