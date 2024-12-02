import React, { useState } from 'react';
import { sample } from '../../utils';
import { WORDS } from '../../data';
import Banner from '../Banner/Banner';
import GuessInput from '../GuessInput/GuessInput';
import GuessGrid from '../GuessGrid/GuessGrid';
import Keyboard from '../Keyboard/Keyboard'; 

function Game() {
  const [answer, setAnswer] = useState(() => sample(WORDS));
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('in-progress');

  const handleSubmit = () => {
    if (guess === answer) {
      setGameStatus('won');
    } else if (guesses.length === 5) {
      setGameStatus('lost');
    }

    if (guess.length === 5) {
      setGuesses([...guesses, guess]);
    }

    setGuess('');
  };
  

  const restartGame = () => {
    setAnswer(sample(WORDS));
    setGuesses([]);
    setGameStatus('in-progress');
    setGuess('');
  };

  // Game.js
  return (
    <div>
      <Banner gameStatus={gameStatus} guesses={guesses} answer={answer} restartGame={restartGame} />
      <GuessGrid guesses={guesses} answer={answer} />
      <GuessInput guess={guess} setGuess={setGuess} onSubmit={handleSubmit} gameStatus={gameStatus} />
      <Keyboard guesses={guesses} answer={answer} setGuess={setGuess} onSubmit={handleSubmit} />
    </div>
  );
}

export default Game;
