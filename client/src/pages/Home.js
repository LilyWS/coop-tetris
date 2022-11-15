import React from 'react';
import { useNavigate } from "react-router-dom";

import { useMutation } from '@apollo/client';
import { CREATE_MATCH } from '../utils/mutations';
import { v4 as uuidv4 } from "uuid";

import Header from '../components/Header';

//TODO: KEEP TRACK OF UUID AND USE IT TO TRACK USER THROUGHOUT MATCH. SOCKET ID IS LESS RELIABLE BECAUSE THEY CAN REFRESH

const Home = () => {
  const navigate = useNavigate();

  const [createMatchMutation, { error, data }] = useMutation(CREATE_MATCH);

  const createMatch = async () => {
    let uid = uuidv4();
    console.log(uid);
    const { data } = await createMatchMutation({
      variables: { user: uid },
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