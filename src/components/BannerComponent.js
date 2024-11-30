import React, { useState } from "react";

function BannerComponent(props) {
  const [isVisible, setIsVisible] = useState(true);

  if (isVisible) {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }

  if (!isVisible) {
    return null;
  }

  if (props.gameStatus === "won") {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{props.guesses.length} guesses</strong>.
        </p>
      </div>
    );
  }

  if (props.gameStatus === "lost") {
    return (
      <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>{props.answer}</strong>.
        </p>
      </div>
    );
  }

  return null;
}

export default BannerComponent;
