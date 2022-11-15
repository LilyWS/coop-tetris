import React, { useEffect, useRef, useState } from 'react';
import {useParams} from "react-router-dom";
import Canvas from '../components/Canvas';
import io from 'socket.io-client';

import './game.css';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const Game = (props) => {
  const socket = useRef(null);
  const {matchID} = useParams();
  console.log(matchID)
  
  const [board, setBoard] = useState(Array(22).fill().map(() => Array(12).fill(0)));

  useEffect(() => {
    socket.current = io(props.SEndpoint);
    socket.current.on("connection", () => {
      socket.current.emit('matchJoin', matchID);
    })
    socket.current.on('move', x => {
      stats.current = x;
    })
  }, [])
  
  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler, true)
  }, [])

  const canvasRef = useRef(null);
  
  const stats = useRef(50)

  const draw = (ctx, frameCount, canvas) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    // console.log(stats);
    for (let y = 0;y<board.length;y++){
      for (let x = 0;x<board[y].length;x++){
        if (board[y][x] == 0) {
          let tl = canvas.width/12;
          // ctx.fillStyle = white;
          ctx.fillRect(x*tl, y*tl, tl, tl);
        }
        }
    }
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0
    let animationFrameId
    
    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount, canvas)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])


  const onKeyDownHandler = (e) => {
    if (e.keyCode == 68) {
      socket.current.emit('keypress', 'e');
    }else if (e.keyCode == 65){
      socket.current.emit('keypress', 'a');
    }
  }

  return (
        <canvas ref={canvasRef} height={window.innerWidth/48*22} width={window.innerWidth/4} id="game-display"/>
  );
};

export default Game;