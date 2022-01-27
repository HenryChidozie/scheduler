// import React, {useState, useEffect} from "react";
// import axios from "axios";

// import "components/Application.scss";
// import DayList from "./DayList";
// import Appointment from "./Appointment";
// import { getInterview, getInterviewersForDay, getAppointmentsForDay } from "../helpers/selectors";
// import useApplicationData from "../hooks/useApplicationData";
// //import useVisualMode from "../hooks/useVisualMode";


// export default function Application(props) {
//   const {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview
//   } = useApplicationData();

//   const interviewers = getInterviewersForDay(state, state.day);

//   const appointments = getAppointmentsForDay(state, state.day).map(
//     appointment => {
//       return (
//         <Appointment
//           key={appointment.id}
//           {...appointment}
//           interview={getInterview(state, appointment.interview)}
//           interviewers={interviewers}
//           bookInterview={bookInterview}
//           cancelInterview={cancelInterview}
//         />
//       );
//     }
//   );

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={state.days} day={state.day} setDay={setDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         <section className="schedule">
//           {appointments}
//           <Appointment key="last" time="5pm" />
//         </section>
//       </section>
//     </main>
//   );
// }

//    Main application component responsible for rendering everything.

import React from "react";

import "./Application.scss";
import DayList from "./DayList";
import useApplicationData from "../hooks/useApplicationData";
import Appointment from "components/Appointment";
import { getInterview, getInterviewersForDay, getAppointmentsForDay } from "../helpers/selectors";

export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
  //console.log("state", state);


  const dailyAppointments = getAppointmentsForDay(state, state.day);
  //console.log("daily appointments", dailyAppointments);

  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentList = dailyAppointments.map(appointment => {
    const { id, interview } = appointment;
    const interviewObj = getInterview(state, interview);
    console.log("interviewObject", interviewObj);
    return (
      <Appointment
        key={id}
        {...appointment}
        interview={interviewObj}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })

  console.log("interviewers", interviewers);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* {
          state["appointments"].map(ele => {
            const interviewName = getInterview(state, ele.interview)    //student name & interviewer, if exists.
            return <Appointment 
              key={ele.id} 
              id={ele.id}
              time={ele.time}
              interview={interviewName}
              interviewers={getInterviewersForDay(state, state.day)}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          }) 
        } */}
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    );
}