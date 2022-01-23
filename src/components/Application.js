import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";


//Days Array
export default function Application(props) {
  const setDays = day => setState({...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
  });
  
  useEffect(() => {
    axios.get('/api/days').then(response => {
      setDays((response.data));
    });
  }, []);


  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview:{
        student:"Lydia Miller-Jones",
        interviewer:{
          id: 3,
          name:"Sylvia Palmer",
          avatar:"http://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview:{
        student: "Archie Andrews",
        interviewer:{
          id: 4,
          name: "Cohana Roy",
          avatar: "http://i.imgur.com/FK8V841.jpg",
        }
      }
    },
    {
      id: 5,
      time: "4pm",
    }
  ];

  const appointmentList = appointments.map((appointment) => {
    return <Appointment key={appointment.id}{...appointment} />;
  });

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
          value={state.days}
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
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section> 
    </main>
  );
}

