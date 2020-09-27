import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Score = ({
  correctScore,
  incorrectScore,
  correctSpin,
  incorrectSpin,
}) => {
  return (
    <div className="score">
      <h6 className="score-correct">
        <FontAwesomeIcon icon={faCheckCircle} spin={correctSpin} size="lg" />
        {"  " + correctScore}
      </h6>
      <h6 className="score-incorrect">
        <FontAwesomeIcon icon={faTimesCircle} spin={incorrectSpin} size="lg" />
        {"  " + incorrectScore}
      </h6>
    </div>
  );
};

export default Score;
