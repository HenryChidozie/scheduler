import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";



export default function Form(props) {
  const { name, interviewers, interviewer, onCancel } = props;
  
  const [username, setUsername] = useState(name || "");
  const [director, setInterviewer] = useState(interviewer || null);
  //const [error, setError] = useState("");

  // const { state, updateState } = useStateObject({
  //   stusentName: props.name || "",
  //   interviewerId: props.interviewer || null,
  //   errorMessage: null
  // });

  const reset = function() {
    setUsername("");
    setInterviewer(null);
  };
  

  const cancel = () => {
    reset();
    onCancel();
  };


  // function validate() {
  //   if (username === "") {
  //     setError("Student name cannot be Blank");
  //     return;
  //   }
  //   if (director === null) {
  //     setError("Please select an interviewer");
  //     return;
  //   }
  //   onSave(username, director, edit);
  // };


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
            name="name"
            value={username}
            placeholder="Enter Student Name"
            autoFocus
            onFocus={(e) => e.target.select()}
            onChange={e => setUsername(e.target.value)}
            //data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{}</section>
        <p>Interviewer</p>
          <InterviewerList
            interviewers={interviewers}
            value={director}
            onChange={setInterviewer}
          />
        </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={""}>Save</Button>
        </section>
      </section>
    </main>
  );
}