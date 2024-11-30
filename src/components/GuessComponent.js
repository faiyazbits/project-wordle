
import React from "react";
import GridComponent from "./GridComponent";
import { checkGuess } from "../game-helpers";
import { range } from "../utils";

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

export default GuessComponent;
