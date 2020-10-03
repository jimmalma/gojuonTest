import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faPaperPlane,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

//import components
import RandomHiragana from "./Components/RandomHiragana";
import RandomKatakana from "./Components/RandomKatakana";

if (
  localStorage.getItem("mode") === null ||
  localStorage.getItem("n_question") === null
) {
  localStorage.setItem("mode", "Hiragana");
  localStorage.setItem("n_question", 10);
}

function App() {
  const genRandomNoList = (size = 10) => {
    let numberList = [];
    while (numberList.length < size) {
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
  const [n_question, setN_question] = useState(
    parseInt(localStorage.getItem("n_question"))
  );
  const [qList, setQList] = useState(genRandomNoList(n_question));
  const [qNo, setQNo] = useState(0);
  const [isSpin, setIsSpin] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [correctRecord, setCorrectRecord] = useState([]);
  const [incorrectRecord, setIncorrectRecord] = useState([]);

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
    setRomanjiText("");
    setAnswer("");
    setIsShowed(false);
    setN_question(parseInt(localStorage.getItem("n_question")));
    setQList(genRandomNoList(n_question));
    setQNo(0);
    setMode(localStorage.getItem("mode"));
    setCorrectScore(0);
    setIncorrectScore(0);
    setCorrectRecord([]);
    setIncorrectRecord([]);
  };

  const changeMode = (e) => {
    e.preventDefault();
    setMode(e.target.textContent);
    localStorage.setItem("mode", e.target.textContent);
    resetQuestion(e);
  };

  const increaseQuestion = (e) => {
    e.preventDefault();
    setN_question(n_question + 1);
    localStorage.setItem("n_question", n_question + 1);
  };

  const decreaseQuestion = (e) => {
    e.preventDefault();
    setN_question(n_question - 1);
    localStorage.setItem("n_question", n_question - 1);
  };

  return (
    <div className="App">
      <h2>Gojūon Test - {mode}</h2>
      <span>
        number of question:
        <button onClick={increaseQuestion} className="n_question">
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
        {n_question}
        <button onClick={decreaseQuestion} className="n_question">
          <FontAwesomeIcon icon={faMinusCircle} />
        </button>
      </span>

      {mode === "Hiragana" ? (
        <RandomHiragana
          answer={answer}
          setIsShowed={setIsShowed}
          qList={qList}
          qNo={qNo}
          setQNo={setQNo}
          correctScore={correctScore}
          setCorrectScore={setCorrectScore}
          incorrectScore={incorrectScore}
          setIncorrectScore={setIncorrectScore}
          correctRecord={correctRecord}
          setCorrectRecord={setCorrectRecord}
          incorrectRecord={incorrectRecord}
          setIncorrectRecord={setIncorrectRecord}
        />
      ) : (
        <RandomKatakana
          answer={answer}
          setIsShowed={setIsShowed}
          qList={qList}
          qNo={qNo}
          setQNo={setQNo}
          correctScore={correctScore}
          setCorrectScore={setCorrectScore}
          incorrectScore={incorrectScore}
          setIncorrectScore={setIncorrectScore}
          correctRecord={correctRecord}
          setCorrectRecord={setCorrectRecord}
          incorrectRecord={incorrectRecord}
          setIncorrectRecord={setIncorrectRecord}
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
        <button className="mode" onClick={changeMode}>
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
