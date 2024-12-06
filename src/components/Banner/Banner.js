import React from 'react';
import PropTypes from 'prop-types';

function Banner({ gameStatus, guesses, answer }) {
  if (gameStatus === 'playing') return null;

  const message =
    gameStatus === 'won'
      ? `Congratulations! Got it in ${guesses.length} guesses.`
      : `Sorry, the correct answer is ${answer}.`;

  return (
    <div className={`${gameStatus === 'won' ? 'happy' : 'sad'} banner`}>
      <p>{message}</p>
    </div>
  );
}

Banner.propTypes = {
  gameStatus: PropTypes.oneOf(['playing', 'won', 'lost']).isRequired,
  guesses: PropTypes.array.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Banner;
