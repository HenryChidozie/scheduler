import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";



export default function Form(props) {

  const { name, interviewers, interviewer, onSave, onCancel, edit } = props;
  const [username, setUsername] = useState(name || "");
  const [interviewerId, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  // const { state, updateState } = useStateObject({
  //   stusentName: props.name || "",
  //   interviewerId: props.interviewer || null,
  //   errorMessage: null
  // });

  
  
  function validate() {
    if (username === "") {
      setError("Student name cannot be Blank");
      return;
    }
    if (interviewerId === null) {
      setError("Please select an interviewer");
      return;
    }
    onSave(username, interviewerId, edit);
  };


  function cancel() {
    setUsername("");
    setInterviewer(null);
    onCancel();
  };
  // function cancel() {
//   updateState({ stusentName: ""});
//   props.onCancel();
// }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            name="studentName"
            value={username}
            placeholder="Enter Student Name"
            autoFocus
            onFocus={(event) => event.target.select()}
            onChange={(event) => setUsername(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={interviewers}
            interviwer={interviewerId}
            setInterviewer={(interviewerId) => setInterviewer(interviewerId)}
          />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}