import React from 'react';

function GuessInput({ guess, setGuess, onSubmit, gameStatus }) {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(event); // Pass the event to handleSubmit
    setGuess(''); // Reset the guess input after submission
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="guess-input">Enter your guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        disabled={gameStatus !== 'in-progress'}
      />
    </form>
  );
}

export default GuessInput;
