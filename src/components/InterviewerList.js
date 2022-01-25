import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "./PropTypes";


export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.array.isRequired
  };

  const interviewerListClass = ("interviewers__list");
  const interviewerChecker = props.interviewers.map((ele) => {
    return (
      <InterviewerListItem
        key={ele.id}
        name={ele.name}
        avatar={ele.avatar}
        selected={ele.id === props.value}
        setInterviewer={(event) => props.setInterviewer(ele.id)}
      />
    );
  });

  return (
    <ul className={interviewerListClass}>
      {interviewerChecker}
    </ul>
  );
};
