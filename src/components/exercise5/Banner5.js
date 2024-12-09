
import React, { useState } from "react";
import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

//Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Banner({ isWinner, answer, guesses }) {
    let message;
    if (isWinner) {
        message = (
            <p><strong>Congratulations!</strong> Got it in {guesses.length}<strong>{guesses} guesses</strong>.</p>
        );
    } else {
        message = (
            <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
        );
    }
    return (
        <div className={isWinner ? "happy banner" : "sad banner"}>
             <p>{message}</p>
        </div>
    );
}

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
    const [isGameOver, setIsGameOver] = useState(false);
    const [isWinner, setIsWinner] = useState(false);

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
            const newGuessWords = [...guessWords, inputValue];
            const newResultsList = [...results, newResults];

            setGuessWords(newGuessWords);
            setResults(newResultsList);

            if (inputValue === answer) {
                setIsGameOver(true);
                setIsWinner(true);
            } else if (newGuessWords.length === NUM_OF_GUESSES_ALLOWED) {
                setIsGameOver(true);
                setIsWinner(false);
            }
            setInputValue("");

        } else {
            alert("Input must be exactly 5 characters long!");
        }
    };

    return (
        <div className="game-wrapper">
            {isGameOver && <Banner isWinner={isWinner} answer={answer} guesses={guessWords.length} />}
            <form className="guess-input-wrapper" onSubmit={onGuessSubmit}>
                <label htmlFor="guess-input">Enter guess:</label>
                <input id="guess-input" type="text" value={inputValue}
                    onChange={onChange} disabled={isGameOver} />
                <button style={{  textAlign: "center", border: "2px solid blue" }}type="submit" disabled={isGameOver}>Submit</button>
            </form>
            <GuessWordList guessWords={guessWords} results={results} />
        </div>
    );
}

export default GuessGame;