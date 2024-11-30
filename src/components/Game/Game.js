import React, { useState } from "react";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import FormInputComponent from "../FormInput";
import Keyboard from "../Keyboard";
import BannerComponent from "../BannerComponent";
import GuessComponent from "../GuessComponent";

// Pick a random word on every page load.
const answer = sample(WORDS);
console.info({ answer }); // Log the answer for debugging

function Game() {
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const [letterStatusMap, setLetterStatusMap] = useState({});
  const [inputValue, setInputValue] = useState("");

  const addGuess = (newGuess) => {
    const updatedGuesses = [...previousGuesses, newGuess];
    setPreviousGuesses(updatedGuesses);

    const updatedLetterStatusMap = { ...letterStatusMap };
    const guessResult = checkGuess(newGuess, answer);

    guessResult.forEach((result) => {
      const letter = result.letter;
      if (!updatedLetterStatusMap[letter] || updatedLetterStatusMap[letter] === "incorrect") {
        updatedLetterStatusMap[letter] = result.status;
      }
    });

    setLetterStatusMap(updatedLetterStatusMap);

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
      <Keyboard letterStatuses={letterStatusMap}
                handleInput={handleInput}
                gameStatus={gameStatus}
                value={inputValue}
      />
    </div>
  );
}

export default Game;
