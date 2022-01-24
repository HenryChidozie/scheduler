import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


//Days Array
export default function Application(props) {
  //const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const Appointments = getAppointmentsForDay(state, day);

  const schedule = 
  Appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
      keys={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
    );
  });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      console.log('response', all)
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days:days.data,
        appointments:appointments.data,
        interviewers:interviewers.data
      }));
    });
  }, []);

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
          onChange={state.setDays}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section> 
    </main>
  );
}

