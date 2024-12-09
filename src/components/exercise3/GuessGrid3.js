import React, { useState } from "react";
import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';


//Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function GuessWordGridRow({ word }) {
    return (
        <p>
            {range(5).map((index) => (
                <span key={index} style={{ display: "inline-block" }} className="cell">
                    {word ? word[index] : ""}
                </span>
            ))}
        </p>
    );
}

function GuessWordList({ guessWords }) {
    return (
        <div className="guess-results">
            {
                range(NUM_OF_GUESSES_ALLOWED).map((index) => (
                    // Render a Guess component for each row, passing the corresponding guess or blank.
                    <GuessWordGridRow key={index} word={guessWords[index]} />
                ))
            }
        </div>
    )
}

function GuessGame() {
    const [inputValue, setInputValue] = useState("");
    const [guessWords, setGuessWords] = useState([]);


    const onChange = (event) => {
        const value = event.target.value.toUpperCase();
        if (value.length <= 5) {
            setInputValue(value);
        }
    };

    const onGuessSubmit = (event) => {
        event.preventDefault();
        if (inputValue.length === 5) {
            guessWords.push(inputValue)
            setGuessWords(guessWords)
            setInputValue("");
        } else {
            alert("Input must be exactly 5 characters long!");
        }
    };

    return (
        <div className="game-wrapper">
            <form className="guess-input-wrapper" onSubmit={onGuessSubmit}>
                <label htmlFor="guess-input">Enter guess:</label>
                <input id="guess-input" type="text" value={inputValue}
                    onChange={onChange} />
                <button style={{  textAlign: "center", border: "2px solid blue" }} type="submit">Submit</button>
            </form>
            <GuessWordList guessWords={guessWords} />
        </div>
    );
}


export default GuessGame;
