// Helper functions for managing appointments and interviews.
export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysAppointment = filteredDay.appointments.map(id => appointments[id]);
  return daysAppointment;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObject = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.find(item => item.name === day);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  return  filteredDay.interviewers.map( id => interviewers[id] );
}