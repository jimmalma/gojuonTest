import React, { useState, useEffect } from "react";
import hiragana from "../hiragana";
import Score from "./Score";
import AnsRecord from "./AnsRecord";

const RandomHiragana = ({
  answer,
  setIsShowed,
  qList,
  qNo,
  setQNo,
  correctScore,
  setCorrectScore,
  incorrectScore,
  setIncorrectScore,
  correctRecord,
  setCorrectRecord,
  incorrectRecord,
  setIncorrectRecord,
  setIsPrompt,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const [correctSpin, setCorrectSpin] = useState(false);
  const [incorrectSpin, setIncorrectSpin] = useState(false);

  useEffect(() => {
    if (answer === hiragana[qList[qNo]]["romanization"]) {
      setCorrectRecord([...correctRecord, answer]);
      setQNo(qNo !== qList.length - 1 ? qNo + 1 : qNo);
      setCorrectScore(correctScore + 1);
      setCorrectSpin(true);
      setIsPrompt(false);
      setTimeout(() => {
        setCorrectSpin(false);
      }, 2000);
    } else if (answer !== hiragana[qList[qNo]]["romanization"] && answer) {
      setIsPrompt(true);
    }
  }, [answer]);

  useEffect(() => {
    if (correctRecord.length + incorrectRecord.length === qList.length) {
      setIsShowed(true);
      document.querySelector("#showButton").disabled = true;
    }
  });
  const showAns = () => {
    setIncorrectRecord([
      ...incorrectRecord,
      hiragana[qList[qNo]]["romanization"],
    ]);
    setIsHidden(false);
    setIncorrectScore(incorrectScore + 1);
    setIncorrectSpin(true);
    setIsShowed(true);
    setIsPrompt(false);
    setTimeout(() => {
      setIncorrectSpin(false);
    }, 2000);
    setTimeout(() => {
      setQNo(qNo !== qList.length - 1 ? qNo + 1 : qNo);
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
            {hiragana[qList[qNo]]["romanization"]}
          </h2>
        </div>
        <div className="randomHiragana-question">
          <h3>Question {qNo + 1}:</h3>
          <h1>{hiragana[qList[qNo]]["character"]}</h1>
        </div>
        <Score
          correctScore={correctScore}
          incorrectScore={incorrectScore}
          correctSpin={correctSpin}
          incorrectSpin={incorrectSpin}
        />
      </div>

      <AnsRecord
        isHidden={
          correctRecord.length + incorrectRecord.length === qList.length
            ? false
            : true
        }
        correctRecord={correctRecord}
        incorrectRecord={incorrectRecord}
        qList={qList}
      />
    </div>
  );
};

export default RandomHiragana;
