// // Custom hook that manages application state via useApplicationReducer
// //    and performs network API requests.

// import { useEffect, useReducer } from "react";
// import axios from "axios";

// import reducer, {
//   SET_DAY,
//   SET_APPLICATION_DATA,
//   SET_INTERVIEW,
//   UPDATE_SPOTS
// } from "../reducers/application";
// //import SocketHandler from "../helpers/socket_handler";

// // Default values for the application state:
// const DEFAULT_STATE = {
//   selectedDay:  1, // null
//   days:         null,
//   appointments: null
// };

// // Initialize the WebSocket handler:
// //    This does not initiate a connection.
// //const socket = SocketHandler(process.env.REACT_APP_WEBSOCKET_URL);

// // useApplicationData manages application state separately from
// //    the Application component (which handles rendering).
// //    Also provides functions that update the database via the API.

// export default function useApplicationData() {

//   // The state of things:
//   //    Initial default values are set here.
//   //    Components should have checks for nulls.
//   // const { state, updateState } = useStateObject(DEFAULT_STATE);
//   const [ state, dispatch ] = useReducer(reducer, DEFAULT_STATE);

//   // Load data from the API server on initial page load
//   //    and save it in the state object:
//   useEffect(() => {
//     Promise.all([
//       axios.get("/days"),
//       axios.get("/appointments"),
//       axios.get("/interviewers")
//     ])
//     .then((req) => {
//       // Update the application state:
//       dispatch({
//         type:         SET_APPLICATION_DATA,
//         days:         req[0].data,
//         appointments: req[1].data,
//         interviewers: req[2].data
//       })
//       // Set up the WebSocket connection:
//       //socket
//         .on("message", function(message, _event) {
//           dispatch(message);
//           dispatch({ type: UPDATE_SPOTS, dayId: state.selectedDay });
//         })
//         .on("error", function(event) {
//           console.warn("socket.error", event);
//         })
//         .open();
//     })
//     .catch((err) => console.warn("useApplicationData: useEffect[]: Promise.all error:", err));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // setDay sets the currently selected day chosen in the sidebar.
//   //    This will trigger an effect in Application that re-renders the schedule.

//   function setDay(dayId) {
//     dispatch({ type: SET_DAY, dayId });
//   }

//   // bookInterview saves an interview appointment
//   //    in the database via the API server.

//   function bookInterview(id, interview) {
//     return axios.put(`/appointments/${id}`, {
//       ...state.appointments[id],
//       interview: { ...interview }
//     })
//       .then((_res) => {
//         dispatch({ type: SET_INTERVIEW, id, interview });
//         dispatch({ type: UPDATE_SPOTS, dayId: state.selectedDay });
//       })
//   }

//   // cancelInterview removes an interview appointment
//   //    from the database via the API server.

//   function cancelInterview(id) {
//     return axios.delete(`/appointments/${id}`)
//       .then((_res) => {
//         dispatch({ type: SET_INTERVIEW, id, interview: null });
//         dispatch({ type: UPDATE_SPOTS, dayId: state.selectedDay });
//       })
//   }

//   return [ state, setDay, bookInterview, cancelInterview ];

// }


import { useState, useEffect } from "react";
import axios from "axios";

//import { } from "../helpers/selectors";

const useApplicationData = function() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(all => {
      console.log("all", all);

      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      }))
      // setState(prev => ({
      //   ...prev, 
      //   days: all[0]["data"], 
      //   appointments: getAppointmentsForDay({
      //     ...prev, 
      //     days: all[0]["data"], 
      //     appointments: all[1]["data"], 
      //     interviewers: all[2]["data"]
      //   }, 
      //   state.day
      //   ),
      //   interviewers: all[2]["data"]
      // }))
    });
  },[]);

  const setDay = day => setState({ ...state, day });

  function spotCalculator (id, boolean = false) {     //update spots. boolean ? new appointment : delete appointment 

    let spot = 0;
    boolean ? spot-- : spot++;
    const days = state.days.filter(ele => {
      return [ele.appointments.find(appId => appId === id) ? ele.spots += spot : null, ele];
    });
    return setState({...state, days});
  };

  function bookInterview(id, interview) {
    const newAppointment = { ...state.appointments[id], interview}
    const savedAppointment = {...state.appointments, [id]: newAppointment}
    return axios
      .put(`/api/appointments/${id}`, savedAppointment[id])
      .then(() => {
        setState({
          ...state,
          appointmrnt: savedAppointment
        });
      })
  }

  // function bookInterview(id, interview, edit) {
  //   const appointments = getAppointmentsById(state.appointments, interview, id);
  //   return axios.put(`/api/appointments/${id}`, { interview: interview })
  //     .then(res => console.log(res))
  //     .then(() => {
  //       setState({ 
  //         ...state,
  //         appointments,
  //       });
  //     })
  //     .then(() => {
  //       if (!edit) {spotCalculator(id, true)}                  // edit ? editing, no spot change : new booking, spot--
  //     });                                                      // putting here to prevent falsy change in case of server down
  // };
  
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      setState({
        ...state,
      })
    })
    .then(() => {
      spotCalculator(id);
    })
  };
  
  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;