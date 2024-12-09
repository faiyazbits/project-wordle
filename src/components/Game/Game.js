import React, { useState } from "react";

import { sample } from '../../utils';
import { WORDS } from '../../data';


//Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Guessgame1() {
  const [inputValue, setInputValue] = useState("");

  const onChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (value.length <= 5) {
      setInputValue(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault(); 
    if (inputValue.length === 5) {
      console.log("SetValue is", inputValue)
      setInputValue("");
    } else {
      alert("Input must be exactly 5 characters long!");
    }
  };

  return (
    <div>
      <form className="guess-input-wrapper" onSubmit={onSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input id="guess-input" type="text" value={inputValue}
          onChange={onChange} />
        <button style={{  textAlign: "center", border: "2px solid blue" }}type="submit">Submit</button>
      </form>
    </div>
  );
}


function Game() {
  return (
    <div className="game-wrapper">
      <Guessgame1 />
    </div>
  )
}

export default Game;
