// // Helper functions for managing appointments and interviews.

// // getAppointmentsForDay returns an array of appointment objects for the given day.

// export const getAppointmentsForDay = (state, dayId) => {
//   try {
//     return state.days
//       .find((stateDay) => stateDay.id === dayId)
//       .appointments.map((appointmentId) => state.appointments[appointmentId]);
//   } catch (err) {
//     return [];
//   }
// };

// // getInterviewersForDay returns an array of interviewer objects for the given day.

// export const getInterviewersForDay = (state, dayId) => {
//   try {
//     return state.days
//       .find((stateDay) => stateDay.id === dayId)
//       .interviewers.map((interviewerId) => state.interviewers[interviewerId]);
//   } catch (err) {
//     return [];
//   }
// };

// // getInterview returns a full interview object for an interview
// //    object coming from the appointments API.

// export const getInterview = (state, interview) => {
//   try {
//     return {
//       student:     interview.student,
//       interviewer: { ...state.interviewers[interview.interviewer] }
//     };
//   } catch (err) {
//     return null;
//   }
// };


// ==========================================================

// const getAppointmentsForDay = function (state, day) {
//   const filteredDay = state.days.find(days => days.name === day);
//   if (filteredDay[0].length !== 0) {
//     return filteredDay[0]["appointments"].map(ele => state["appointments"][ele]);
//   } else {
//     return [];
//   }
// };

function getAppointmentsForDay(state,day) {
  const filteredDays = state.days.filter(days => days.name === day);
  const dateFound = filteredDays[0];
  if (!dateFound) {
    return [];
  }
  const filteredAppointments = dateFound.appointments.map(perApt => {
    return state.appointments[perApt];
  })
  return filteredAppointments;
}

// const getAppointmentsById = (appointments, interview, id) => {  //interview = {studentName, interview: {id, name}}
//   const index = appointments.findIndex(ele => ele.id === id);
//   appointments[index]["interview"] = interview;
//   return appointments;
// }

const getInterview = function(state, interview) {
  return !interview ? null : {student: interview.student, interviewer: state.interviewers[interview.interviewer]};
};

// const getInterviewersForDay  = function (state, day) {
//   const filteredInterviewer = state.days.filter(days => days.name === day);
//   if (filteredInterviewer.length !== 0) {
//     return filteredInterviewer[0]["interviewers"].map(ele => state["interviewers"][ele]);
//   } else {
//     return [];
//   }
// };


function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  console.log('days', days);
  console.log('interviewers', interviewers);

  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysInterviewers = filteredDay.interviewers.map(
    interview => interviewers[interview]
  );
  return daysInterviewers;
}

export { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay,
  //getAppointmentsById
}