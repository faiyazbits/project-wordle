import React from "react";

import { sample, range } from "../../utils";
import { checkGuess } from "../../game-helpers";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });


function GuessInput({ sendGuessValue }) {
  const [guess, setState] = React.useState("");

  function getInputText(event) {
    const text = event.target.value;
    if (text.length > 5) {
      return;
    }
    setState(text);
    if (text.length === 5) {
      sendGuessValue(text);
      setState("");
    }
  }
  return (
    <form className="guess-input-wrapper">
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        onInput={getInputText}
        value={guess}
      />
    </form>
  );
}


function Guess(props) {
  const list = props.value;
  console.log(list);
  return (
    <div className="guess-results">
      {list.map((element, index) => {
        const word = isNaN(element) ? element : "";
        let result = [];
        if (word.length > 4) {
          result = checkGuess(word, answer);
        }
        console.log(result);
        return (
            <p className="guess" key={index}>
              <span className={`cell ${result[0]?.status}`}>
                {result[0]?.letter}
              </span>
              <span className={`cell ${result[1]?.status}`}>
                {result[1]?.letter}
              </span>
              <span className={`cell ${result[2]?.status}`}>
                {result[2]?.letter}
              </span>
              <span className={`cell ${result[3]?.status}`}>
                {result[3]?.letter}
              </span>
              <span className={`cell ${result[4]?.status}`}>
                {result[4]?.letter}
              </span>
            </p>
        );
      })}
    </div>
  );
}


function Game() {
  const arr = range(0, 6, 1);
  const [list, setState] = React.useState(arr);

  function handleGuessValue(data) {
    setState((prevItems) => {
      const newItems = [...prevItems];
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i] === i) {
          newItems[i] = data;
          break;
        }
      }
      return newItems;
    });
  }
  return (
    <div>
      <Guess value={list}></Guess>
      <GuessInput sendGuessValue={handleGuessValue}></GuessInput>
    </div>
  );
}

export default Game;
