import React from 'react';
import { checkGuess } from '../../game-helpers';

function GuessRow({ guess, answer }) {
  const guessStatus = checkGuess(guess, answer);
  const cells = [];

  for (let j = 0; j < 5; j++) {
    cells.push(
      <span key={j} className={`cell ${guessStatus?.[j]?.status || ''}`}>
        {guess[j] || ''}
      </span>
    );
  }

  return <p className="guess">{cells}</p>;
}

export default GuessRow;
