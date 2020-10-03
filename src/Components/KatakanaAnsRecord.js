import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import katakana from "../katakana";

const AnsRecord = ({ isHidden, qList, correctRecord, incorrectRecord }) => {
  return (
    <table className={isHidden ? "hidden" : "ansRecord"}>
      <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>
          <FontAwesomeIcon icon={faCheckCircle} size="lg" />
        </th>
        <th>
          <FontAwesomeIcon icon={faTimesCircle} size="lg" />
        </th>
      </tr>
      {qList.map((q) => (
        <tr id={katakana[q]["roumaji"]}>
          <td>{katakana[q]["kana"]}</td>
          <td>{katakana[q]["roumaji"]}</td>
          <td>
            {correctRecord.includes(katakana[q]["roumaji"]) ? (
              <FontAwesomeIcon
                icon={faCircle}
                size="xs"
                className="score-correct"
              />
            ) : (
              ""
            )}
          </td>
          <td>
            {incorrectRecord.includes(katakana[q]["roumaji"]) ? (
              <FontAwesomeIcon
                icon={faCircle}
                size="xs"
                className="score-incorrect"
              />
            ) : (
              ""
            )}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default AnsRecord;
