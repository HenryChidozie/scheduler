import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";



export default function InterviewerListItem(props) {

  const interviewerListItemClass = classNames(
    "interviewers__item", {
    "interviewers__item--selected": props.selected
    });

  const interviewerListItemImageClass = classNames(
    "interviewers__item-image", {
    "interviewers__item--selected-image": props.selected
    });

  return (
    <li 
      className={interviewerListItemClass}
      onClick={props.setInterviewer}
    >
      <img
        className={interviewerListItemImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}