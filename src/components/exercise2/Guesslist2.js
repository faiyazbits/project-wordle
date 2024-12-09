import React, { useState } from "react";

function GuessWordList({ guessWords }) {
    return (
        <div className="guess-results">
            {
                guessWords.map((guess, index) => (
                    <p key={index} className="guess">{guess}</p>
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

    const onSubmit = (event) => {
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
            <form className="guess-input-wrapper" onSubmit={onSubmit}>
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
