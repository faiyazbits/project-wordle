
import React from "react";
import GridComponent from "./GridComponent";
import { checkGuess } from "../game-helpers";
import { range } from "../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../constants";

function GuessComponent(props) {
  return (
    <div className="guess-results">
      {props.guesses.map((guess, index) => {
        const guessResult = checkGuess(guess, props.answer);
        return <GridComponent key={index} guess={guessResult} />;
      })}
      {range(NUM_OF_GUESSES_ALLOWED - props.guesses.length).map((_, index) => (
        <GridComponent key={index} guess={[]} />
      ))}
    </div>
  );
}

export default GuessComponent;
