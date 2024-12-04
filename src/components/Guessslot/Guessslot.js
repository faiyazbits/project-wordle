import React from 'react';
import { range } from '../../utils'


function Guessslot({ guess = '' }) {
  const letters = guess.split('');
  return (
    <p className="guess">
           {range(5).map((index) => (
            <span key={index} className="cell">
          {letters[index] || ''}
        </span>
      ))}
    </p>
  );
}

export default Guessslot;
