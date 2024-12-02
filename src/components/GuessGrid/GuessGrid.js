import React from 'react';
import GuessRow from '../GuessRow/GuessRow';

function GuessGrid({ guesses, answer }) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    rows.push(
      <GuessRow key={i} guess={guesses[i] || ''} answer={answer} />
    );
  }

  return <div className="guess-results">{rows}</div>;
}

export default GuessGrid;
