//Component showing list of interviewers
import React from "react";
import PropTypes from 'prop-types';
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    interviewers: PropTypes.array,
    setInterviewer: PropTypes.func.isRequired
  };

  const interviewerChecker = props.interviewers.map((interviewer, _index) => {
    return (
      <InterviewerListItem 
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.value} 
        setInterviewer={(_event) => props.onChange(interviewer.id)} 
      />
    );
  });
  return ( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{interviewerChecker}</ul>
    </section>
  );
};

