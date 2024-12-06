import React, { useState, useEffect} from 'react';
import Guess from '../Guess';
import Guessslot from '../Guessslot';
import Banner from '../Banner';

import { checkGuess } from '../../game-helpers';
import { sample } from '../../utils';
import { WORDS } from '../../data';



import { NUM_OF_GUESSES_ALLOWED } from '../../constants'


function Game() {
  const [guesses, setGuesses] = useState([]);
  const [answer, setCorrectAnswer] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');


  const correctAnswer = 'LEARN'; 

  useEffect(() => {
    const randomWord = sample(WORDS);
    console.info({ randomWord });
    setCorrectAnswer(randomWord);
  }, []); 

  const handleGuessSubmit = (guess) => {
    const validatedGuess = checkGuess(guess, answer);
    setGuesses([...guesses, validatedGuess]);
    if (guess === answer) {
      setGameStatus('won');
    } else if (guesses.length + 1 === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  };


  if (!correctAnswer) {
    return <div>Loading...</div>;
  }

  return (
    
      <div>
      <Banner gameStatus={gameStatus} guesses={guesses} answer={answer} />
     <div className="guess-results">
        {Array.from({ length: NUM_OF_GUESSES_ALLOWED }).map((_, index) => (
          <Guessslot key={index} result={guesses[index]} />
        ))}
      </div>  
      <Guess onGuessSubmit={handleGuessSubmit} disabled={gameStatus !== 'playing'} />
      </div>
  );
}

export default Game;
