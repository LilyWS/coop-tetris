import React, { useEffect, useRef, useState } from 'react';
import Canvas from '../components/Canvas';
import io from 'socket.io-client';
//https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const Game = (props) => {

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(props.SEndpoint);
    socket.current.on("connection", () => {
      console.log("hihihihihihi!!!!");
    })
    socket.current.on('move', x => {
      stats.current = x;
    })
  }, [])

  const canvasRef = useRef(null);
  
  const stats = useRef(50)
  console.log(stats, "crud :(")

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    // console.log(stats);
    ctx.arc(stats.current, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
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
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler, true)
  }, [])

  const onKeyDownHandler = (e) => {
    if (e.keyCode == 68) {
      socket.current.emit('keypress', 'e');
    }else if (e.keyCode == 65){
      socket.current.emit('keypress', 'a');
    }
  }

  return (
        <canvas ref={canvasRef} id="game-display"/>
  );
};

export default Game;