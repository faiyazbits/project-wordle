import React, { useState } from 'react';
import Guess from '../Guess';
import Guessslot from '../Guessslot';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants'


function Game() {
  const [guesses, setGuesses] = useState([]);

  const handleGuessSubmit = (guess) => {
    setGuesses([...guesses, guess]);
  };

  const renderGuesses = () => {
    return Array.from({ length: NUM_OF_GUESSES_ALLOWED }).map((_, index) => (
      <Guessslot key={index} guess={guesses[index]} />
    ));
  };

  return (
    <div>
      <Guess onGuessSubmit={handleGuessSubmit} />
      <div className="guess-results">{renderGuesses()}</div>
    </div>
  );
}

export default Game;
