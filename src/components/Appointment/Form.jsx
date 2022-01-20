import React from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";



export default function Form(props) {


  const { state, updateState } = useStateObject({
    stusentName: props.name || "",
    interviewerId: props.interviewer || null,
    errorMessage: null
  });


function cancel() {
  updateState({ stusentName: ""});
  props.onCancel();
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            name="studentName"
            value={state.studentName}
            placeholder="Enter Student Name"
            autoFocus
            onFocus={(event) => event.target.select()}
            onChange={(event) => updateState(event.target)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{state.errorMessage}</section>
          <InterviewerList
            interviewers={props.interviewers}
            interviewer={state.interviewerId}
            setInterviewer={(interviewerId) => updateState({ interviewerId })}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}