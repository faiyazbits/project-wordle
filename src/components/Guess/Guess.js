import React, { useState } from 'react';

function Guess({ onGuessSubmit }) {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length === 5) {
      onGuessSubmit(guess);
      setGuess('');
    } else {
      alert("Guess must be exactly 5 letters.");
    }
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input 
        id="guess-input"
        type="text"
        value={guess}
        onChange={handleChange}
        maxLength={5} 
      />
    </form>
  );
}

export default Guess;
