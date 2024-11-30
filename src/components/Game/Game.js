import React, { useState } from "react";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every page load.
const answer = sample(WORDS);
console.info({ answer }); // Log the answer for debugging

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

function Game() {
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [letterStatuses, setLetterStatuses] = useState({});
  const [inputValue, setInputValue] = useState("");

  const addGuess = (newGuess) => {
    const updatedGuesses = [...previousGuesses, newGuess];
    setPreviousGuesses(updatedGuesses);

    const updatedLetterStatuses = { ...letterStatuses };

    const guessResult = checkGuess(newGuess, answer);

    guessResult.forEach((result) => {
      const letter = result.letter;
      const status = result.status;

      if (!updatedLetterStatuses[letter] || updatedLetterStatuses[letter] === "incorrect") {
        updatedLetterStatuses[letter] = status;
      }
    });

    setLetterStatuses(updatedLetterStatuses);

    if (newGuess === answer) {
      setGameStatus("won");
    } else if (updatedGuesses.length === 6) {
      setGameStatus("lost");
    }
  };


  const handleInput = (key) => {
    if (inputValue.length < 5) {
      setInputValue(inputValue + key);
    }
  };

  return (
    <div>
      <GuessComponent guesses={previousGuesses} answer={answer} />
      <FormInputComponent addGuess={addGuess} gameStatus={gameStatus} inputValue={inputValue}
                          setInputValue={setInputValue} />
      {gameStatus !== "playing" && (
        <BannerComponent gameStatus={gameStatus} answer={answer} guesses={previousGuesses} />
      )}
      <Keyboard letterStatuses={letterStatuses}
        handleInput={handleInput}
        gameStatus={gameStatus}
        value={inputValue}
      />
    </div>
  );
}

function FormInputComponent(props) {
  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    const isValidInput = /^[A-Z]*$/.test(value);
    if (isValidInput) {
      props.setInputValue(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.inputValue.length === 5) {
      props.addGuess(props.inputValue);
      props.setInputValue("");
    } else {
      alert("Word must be exactly 5 characters long.");
    }
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={props.inputValue}
        onChange={handleChange}
        maxLength="5"
        disabled={props.gameStatus !== "playing"}
      />
    </form>
  );
}


function GuessComponent(props) {
  return (
    <div className="guess-results">
      {props.guesses.map((guess, index) => {
        const guessResult = checkGuess(guess, props.answer);
        return <GridComponent key={index} guess={guessResult} />;
      })}
      {range(6 - props.guesses.length).map((_, index) => (
        <GridComponent key={index} guess={[]} />
      ))}
    </div>
  );
}

function GridComponent(props) {
  return (
    <p className="guess p-0">
      {range(5).map((_, cellIndex) => {
        const cell = props.guess[cellIndex];
        return (
          <span
            key={cellIndex}
            className={`cell ${cell ? cell.status : ""}`}
          >
            {cell ? cell.letter : ""}
          </span>
        );
      })}
    </p>
  );
}

function BannerComponent(props) {
  const [isVisible, setIsVisible] = useState(true);
  if (isVisible) {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }
  if (!isVisible) {
    return null;
  }
  if (props.gameStatus === "won") {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{props.guesses.length} guesses</strong>.
        </p>
      </div>
    );
  }
  if (props.gameStatus === "lost") {
    return (
      <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>
    );
  }
  return null;
}

function Keyboard(props) {
  const handleKeyClick = (key) => {
    if (props.gameStatus === "playing") {
      props.handleInput(key);
    }
  };

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const keyStatus = props.letterStatuses[key] || "";
            return (
              <button
                key={key}
                className={`key ${keyStatus}`}
                onClick={() => handleKeyClick(key)}
                disabled={props.gameStatus !== "playing"}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}


export default Game;
