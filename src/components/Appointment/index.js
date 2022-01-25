import React from "react";
import "./styles.scss";
import "components/Appointment/styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, false);
    setTimeout(() => {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW, true))
        .catch((error) => transition(ERROR_SAVE, true))
    }, 1000);
  };

  // function deleteApp() {
  //   transition(CONFIRM, false);
  // };

  function destroy(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }


  function confirm(confirm) {
    if (confirm) {
      transition(DELETING, false);
      setTimeout(() => {
        props.cancelInterview(props.id)
          .then(() => transition(EMPTY, true))
          .catch(() => transition(ERROR_DELETE, true))
      }, 1000);
    } else {
      transition(SHOW, true);
    }
  };


  return (
    <>
      <article className="appointment" >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message={SAVING} />}
        {mode === DELETING && <Status message={DELETING} />}
        {mode === CONFIRM && (
          <Confirm
            message={"Delete the appointment?"}
            onConfirm={confirm}
            onCancel={confirm}
          />
        )}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={''}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
            edit={false}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => back(CREATE)}
            onSave={save}
            edit={true}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message={"Failed to cancel."}
            onClose={() => back()}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message={"Failed to book."}
            onClose={() => back()}
          />
        )}
      </article>
    </>
  );
};