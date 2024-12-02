import React from "react";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

function Keyboard(props) {
  const handleKeyClick = (key) => {
    if (props.gameStatus === "playing") {
      props.handleInput(key);
      document.getElementById("guess-input").focus();
    }
  };

  return (
    <div className="keyboard">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const keyStatus = props.letterStatuses[key] || "";
            return (
              <button
                key={key}
                className={`key ${keyStatus}`}
                onClick={() => handleKeyClick(key)}
                disabled={props.gameStatus !== "playing"}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
