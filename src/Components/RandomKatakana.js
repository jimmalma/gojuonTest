import React, { useState, useEffect } from "react";
import katakana from "../katakana";
import Score from "./Score";
import AnsRecord from "./KatakanaAnsRecord";

const RandomKatakana = ({ answer, setIsShowed, qList, qNo, setQNo }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [correctSpin, setCorrectSpin] = useState(false);
  const [incorrectSpin, setIncorrectSpin] = useState(false);
  const [isPrompt, setIsPrompt] = useState(false);
  const [correctRecord, setCorrectRecord] = useState([]);
  const [incorrectRecord, setIncorrectRecord] = useState([]);

  useEffect(() => {
    if (answer === katakana[qList[qNo]]["roumaji"]) {
      setCorrectRecord([...correctRecord, answer]);
      setQNo(qNo !== 9 ? qNo + 1 : qNo);
      setCorrectScore(correctScore + 1);
      setCorrectSpin(true);
      setIsPrompt(false);
      setTimeout(() => {
        setCorrectSpin(false);
      }, 2000);
    } else if (answer !== katakana[qList[qNo]]["roumaji"] && answer) {
      setIsPrompt(true);
    }
  }, [answer]);

  useEffect(() => {
    setIsPrompt(false);
    if (correctRecord.length + incorrectRecord.length === 10) {
      setIsShowed(true);
      document.querySelector("#showButton").disabled = true;
    }
  });
  const showAns = () => {
    setIncorrectRecord([...incorrectRecord, katakana[qList[qNo]]["roumaji"]]);
    setIsHidden(false);
    setIncorrectScore(incorrectScore + 1);
    setIncorrectSpin(true);
    setIsShowed(true);
    setTimeout(() => {
      setIncorrectSpin(false);
    }, 2000);
    setTimeout(() => {
      setQNo(qNo !== 9 ? qNo + 1 : qNo);
      setIsHidden(true);
      setIsShowed(false);
    }, 2000);
  };

  return (
    <div>
      <div className="randomHiragana">
        <div className="randomHiragana-answer">
          <h4>Answer:</h4>
          <button
            id="showButton"
            onClick={showAns}
            className={!isHidden ? "hidden" : ""}
          >
            show
          </button>
          <h2 className={isHidden ? "hidden ans" : "ans"}>
            {katakana[qList[qNo]]["roumaji"]}
          </h2>
        </div>
        <div className="randomHiragana-question">
          <h3>Question {qNo + 1}:</h3>
          <h1>{katakana[qList[qNo]]["kana"]}</h1>
        </div>
        <Score
          correctScore={correctScore}
          incorrectScore={incorrectScore}
          correctSpin={correctSpin}
          incorrectSpin={incorrectSpin}
        />
      </div>
      <p className={isPrompt ? "randomHiragana-prompt" : "invisible"}>
        Try again !!!!!!
      </p>
      <AnsRecord
        isHidden={
          correctRecord.length + incorrectRecord.length === 10 ? false : true
        }
        correctRecord={correctRecord}
        incorrectRecord={incorrectRecord}
        qList={qList}
      />
    </div>
  );
};

export default RandomKatakana;
