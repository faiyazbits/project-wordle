import React from 'react';
import '../../styles.css';
import { checkGuess } from '../../game-helpers';

function Keyboard({ guesses, answer, onSubmit, setGuess }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  // Function to get the status of a letter based on guesses
  const getLetterStatus = (letter) => {
    // Check if the letter appears in any of the guesses and get its status
    for (let guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          const status = checkGuess(guess, answer)[i]?.status;
          if (status === 'correct') return 'correct';
          if (status === 'misplaced') return 'misplaced';
        }
      }
    }
    return 'unused'; // If letter not found in guesses, return 'unused'
  };

  const handleKeyClick = (letter) => {
    if (letter === 'Backspace') {
      // Handle backspace logic
      setGuess((prevGuess) => prevGuess.slice(0, -1)); // Remove last letter
    } else if (letter === 'Enter') {
      // Handle enter logic (submit the guess)
      if (typeof onSubmit === 'function') {
        onSubmit(); // Submit the guess when Enter is clicked
      } else {
        console.error('onSubmit is not a function');
      }
    } else {
      // Add letter to the guess
      setGuess((prevGuess) => prevGuess + letter);
    }
  };

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const status = getLetterStatus(letter); // Get the status of each letter
            return (
              <button
                key={letter}
                className={`key ${status}`} // Apply the status as class
                onClick={() => handleKeyClick(letter)} // Add onClick to handle input
              >
                {letter}
              </button>

            );
          })}
        </div>
        
        
        
      ))}
      <div className="keyboard-row">
        <button className="key" onClick={() => handleKeyClick('Enter')}>
          Enter
        </button>
        <button className="key" onClick={() => handleKeyClick('Backspace')}>
          Backspace
        </button>
      </div>
    </div>
    
  );
}

export default Keyboard;
