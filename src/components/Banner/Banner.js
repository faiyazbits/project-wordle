import React from 'react';

function Banner({ gameStatus, guesses, answer, restartGame }) {
  if (gameStatus === 'won') {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in <strong>{guesses.length} guesses</strong>.
        </p>
        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="sad banner">
        <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        <button onClick={restartGame}>Try Again</button>
      </div>
    );
  }

  return null;
}

export default Banner;
