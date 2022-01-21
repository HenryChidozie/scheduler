import React from "react";
import "./styles.scss";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
// import Form from "./Form";
// import Status from "./Status";
// import Confirm from "./Confirm";
// import Error from "./Error";


export default function Appointment(props) {

  const showOrEmpty = props.interview ? (
    <Show
      student={props.interview.students}
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    />
  ) : (
    <Empty />
  );

  return (
    <article className="appointment" >
      <Header time={props.time} />
      {showOrEmpty}
    </article>
  );
}