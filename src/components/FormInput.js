import React from "react";

function FormInputComponent(props) {
  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    const alphabeticRegex = /^[A-Z]*$/;
    const isValidInput = alphabeticRegex.test(value);
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

export default FormInputComponent;