import React from "react";
import { range } from "../utils";

function GridComponent(props) {
  return (
    <p className="guess p-0">
      {range(5).map((_, cellIndex) => {
        const cell = props.guess[cellIndex];
        return (
          <span key={cellIndex} className={`cell ${cell ? cell.status : ""}`}>
            {cell ? cell.letter : ""}
          </span>
        );
      })}
    </p>
  );
}

export default GridComponent;
