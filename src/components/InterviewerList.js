import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const interviewerListClass = ("interviewers__list");
  const interviewerChecker = props.interviewers.map((ele) => {
    return (
      <InterviewerListItem
        key={ele.id}
        name={ele.name}
        avatar={ele.avatar}
        selected={ele.id === props.value}
        setInterviewer={(event) => props.onChange(ele.id)}
      />
    );
  });

  return (
    <ul className={interviewerListClass}>
      {interviewerChecker}
    </ul>
  );
};
