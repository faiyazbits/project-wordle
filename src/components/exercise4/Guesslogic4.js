import React, { useState } from "react";
import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

//Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function GuessWordGridRow({ word, result }) {
    return (
        <p className="guess">
            {
                range(5).map((index) => {
                    const status = result ? result[index]?.status : "";
                    return (

                        <span key={index} style={{ display: "inline-block" }} className={`cell ${status}`}>
                            {word ? word[index] : ""}
                        </span>
                    )
                })}
        </p>
    );
}

function GuessWordList({ guessWords, results }) {
    return (
        <div className="guess-results">
            {
                range(NUM_OF_GUESSES_ALLOWED).map((index) => (
                    <GuessWordGridRow key={index} word={guessWords[index]} result={results[index]} />
                ))
            }
        </div>
    )
}

function GuessGame() {
    const [inputValue, setInputValue] = useState("");
    const [guessWords, setGuessWords] = useState([]);
    const [results, setResults] = useState([]);

    const onChange = (event) => {
        const value = event.target.value.toUpperCase();
        if (value.length <= 5) {
            setInputValue(value);
        }
    };

    const onGuessSubmit = (event) => {
        event.preventDefault();
        if (inputValue.length === 5) {
            const newResults = checkGuess(inputValue, answer);
            guessWords.push(inputValue);
            setGuessWords(guessWords);
            setResults([...results, newResults]);
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
            <GuessWordList guessWords={guessWords} results={results}/>
        </div>
    );
}


export default GuessGame;