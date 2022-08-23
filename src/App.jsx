import { useState } from 'react';
import './App.css';
import dustbin from './open-dustbin.png'
import garbage from './garbage.png'
import CountUp from 'react-countup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function App() {

  const [score, setScore] = useState(0)
  const [play, setPlay] = useState(false)
  const [freshPlay, setFreshPlay] = useState(true)

  const handleDragStart = (e) => {
    console.log('Drag Start');
    setTimeout(() => {
      e.target.className += ' hide'
    })
  }

  const handleDragEnd = (e) => {
    e.target.className = 'garbage'
  }

  const handleDrop = (e) => {
    setScore(score => score + 1)

  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const startGame = () => {
    setScore(0)
    setPlay(true)
    setFreshPlay(false)
  }

  const endGame = () => {
    setPlay(false)
  }

  return (
    <>
      {play ? <div className="App">

        <h1 id='score'>Score : {score}</h1>
        <CountUp
          start={60}
          end={0}
          duration={10}
          onEnd={endGame}
        />
        <div
          className="garbage"
          draggable
          onDragStart={(e) => handleDragStart(e)}
          onDragEnd={(e) => handleDragEnd(e)}
        >
        <img src={garbage} alt="garbage" />
        </div>
        <div className="garbage-collector"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <img src={dustbin} alt="dustbin" />
        </div>
      </div> : <div>
        {freshPlay ? <div className='start-game' onClick={startGame}>
          <Button variant='contained'>Let's Play</Button>
        </div>
          :
          <>
            <div className='start-game'>
              <Typography variant='h3' style={{color:"red"}}>Game Over</Typography>
              <h2 className='score'>Your Score is {score}</h2>
            <Button variant='contained' onClick={startGame}>
              Let's Play Again
            </Button>
            </div>
          </>
        }
      </div>}

    </>
  );
}

export default App;
