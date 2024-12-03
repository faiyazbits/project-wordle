import React, { useState } from 'react';
import Guess from '../Guess';


import { sample } from '../../utils';
import { WORDS } from '../../data';


const answer = sample(WORDS);
console.info({ answer });

function Guessgame() {
  const [guess, setGuess] = useState('');
  const [guessList, setGuessList] = useState([]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Entered guess:', guess);
    if (guess) {
      setGuessList([...guessList, guess]);
      setGuess('');
    }    
  };

  const handleChange = (event) => {
    const upperCaseValue = event.target.value.toUpperCase();
    setGuess(upperCaseValue); 
  };

  return (
    <>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          onChange={handleChange}
        />
      </form>
      <Guess guesses={guessList} />
    </>
  );

}



function Game() {
  return (
    <div>
      <Guessgame />
    </div>

   
  )
}

export default Game;
