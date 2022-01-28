//Component showing interviewer's avatar and name
import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";


export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = 
    selected ? classNames("interviewers__item--selected") : classNames("interviewers__items");

  return (
    <li 
      className={interviewerClass}
      onClick={setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};
