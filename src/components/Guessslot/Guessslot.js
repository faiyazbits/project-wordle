import React from 'react';
import { range } from '../../utils';

function Guessslot({ result }) {
  return (
    <p className="guess">
      {range(5).map((index) => {
        const letter = result?.[index]?.letter || '';
        const status = result?.[index]?.status || '';
        return (
          <span key={index} className={`cell ${status}`}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}

export default Guessslot;
