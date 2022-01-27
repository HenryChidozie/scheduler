import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";



export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = 
    selected ? classNames("interviewers__item--selected") : classNames("interviewers__items");

  // const interviewerClass = classNames(
  //   "interviewers__item", {
  //   "interviewers__item--selected": props.selected
  //   });

  // const interviewerListItemImageClass = classNames(
  //   "interviewers__item-image", {
  //   "interviewers__item--selected-image": props.selected
  //   });

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
