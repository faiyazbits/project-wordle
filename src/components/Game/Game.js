import React from "react";

import { sample, range } from "../../utils";
import { checkGuess } from "../../game-helpers";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const arr = range(0, 6, 1);
  const [list, setList] = React.useState(arr);
  let [isSuccess, setFlag] = React.useState(false);
  let [isSadBanner, setBadFlag] = React.useState(false);
  let [count, setCount] = React.useState(0);
  const succesName = "happy banner";
  const sadClassName = "sad banner";
  const noDisplay = "display-visible";

  function handleGuessValue(data) {
    setList((prevItems) => {
      const newItems = [...prevItems];
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i] === i) {
          newItems[i] = data;
          break;
        }
      }
      if (data.length) {
        let value = count + 1;
        let isBad =
          value === 6
            ? newItems.every((ele) => ele.toUpperCase() !== answer)
            : false;
        setCount(value);
        setBadFlag(isBad);
        setTimeout(() => {
          setBadFlag(false);
        }, 5000);
      }
      return newItems;
    });
  }

  function handleBanner(value) {
    setFlag(value);
  }

  return (
    <div>
      <Guess value={list} sendSuccessToaster={handleBanner}></Guess>
      <GuessInput sendGuessValue={handleGuessValue}></GuessInput>
      <VisualKeyboard input={list}></VisualKeyboard>

      <div className={`${isSuccess ? succesName : noDisplay}`}>
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {count} guesses</strong>.
        </p>
      </div>

      <div className={`${isSadBanner ? sadClassName : noDisplay}`}>
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>

      <Refresh sBanner={isSuccess} fBanner={isSadBanner}></Refresh>
    </div>
  );
}

function Guess(props) {
  const list = props.value;
  console.log(list);
  const { sendSuccessToaster } = props;
  return (
    <div className="guess-results">
      {list.map((element, index) => {
        const word = isNaN(element) ? element : "";
        let result = [];
        if (word.length > 4) {
          result = checkGuess(word, answer);
        }
        console.log(result);
        let isSuccess = false;
        if (result.length) {
          isSuccess = result.every((ele, element) => ele.status === "correct");
          sendSuccessToaster(isSuccess);
        }
        setTimeout(() => {
          sendSuccessToaster(false);
        }, 3000);
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

function VisualKeyboard(props) {
  const inputWords = props.input.filter((word) => word.length > 4);
  const keyboardKeys = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  function getClassName(char) {
    let results = inputWords.map((element) => {
      return checkGuess(element, answer);
    });
    const infoList = results.flat().filter((result) => result.letter === char);
    const info = infoList.length ? infoList[infoList.length - 1] : {};
    return info ? info.status : "";
  }

  return (
    <div className="visual-keyboard">
      {keyboardKeys.map((element, index) => {
        return (
          <div key={index} className={`row row-${index}`}>
            {[...element].map((ele, ix) => {
              const status = getClassName(ele);
              return (
                <span key={ix} className={`key-cell cell ${status}`}>
                  {ele}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function Refresh(props) {
  if (props.sBanner || props.fBanner) {
    setTimeout(() => {
      location.reload();
    }, 4000);
  }
}

export default Game;
