import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

//import components
import RandomHiragana from "./Components/RandomHiragana";
import RandomKatakana from "./Components/RandomKatakana";

function App() {
  const genRandomNoList = (size = 10) => {
    let numberList = [];
    while (numberList.length < 10) {
      let tempNo = Math.floor(Math.random() * 46);
      if (!numberList.includes(tempNo)) {
        numberList.push(tempNo);
      }
    }
    return numberList;
  };
  const [romanjiText, setRomanjiText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isShowed, setIsShowed] = useState(false);
  const [qList, setQList] = useState(genRandomNoList());
  const [qNo, setQNo] = useState(0);
  const [isSpin, setIsSpin] = useState(false);
  const [mode, setMode] = useState("Hiragana");

  const getRomanjiText = (e) => {
    setRomanjiText(e.target.value);
  };

  const submitAns = (e) => {
    e.preventDefault();
    setAnswer(romanjiText);
    setRomanjiText("");
  };

  const resetQuestion = (e) => {
    e.preventDefault();
    setQList(genRandomNoList());
    setQNo(0);
    setIsSpin(true);
    setTimeout(() => {
      setIsSpin(false);
    }, 2000);
  };

  const changeMode = (e) => {
    e.preventDefault();
    setMode(e.target.textContent);
  };
  return (
    <div className="App">
      <h2>Gojūon Test - {mode}</h2>

      {mode === "Hiragana" ? (
        <RandomHiragana
          answer={answer}
          setIsShowed={setIsShowed}
          qList={qList}
          qNo={qNo}
          setQNo={setQNo}
        />
      ) : (
        <RandomKatakana
          answer={answer}
          setIsShowed={setIsShowed}
          qList={qList}
          qNo={qNo}
          setQNo={setQNo}
        />
      )}
      <div className={isShowed ? "hidden" : ""}>
        <input
          type="text"
          value={romanjiText}
          onChange={getRomanjiText}
          maxLength="6"
        ></input>
        <button onClick={submitAns} className="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
      <button onClick={resetQuestion} className="reset">
        <FontAwesomeIcon icon={faRedoAlt} size="lg" spin={isSpin} />
      </button>
      <div className="option">
        <button className="mode" onClick={changeMode} autoFocus>
          Hiragana
        </button>
        <button className="mode" onClick={changeMode}>
          Katakana
        </button>
        <button className="mode" disabled>
          Inverse
        </button>
        <button className="mode" disabled>
          Full character
        </button>
      </div>
    </div>
  );
}

export default App;
