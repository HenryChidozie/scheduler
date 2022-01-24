export const getAppointmentsForDay = (state, day) => {
  try {
    return state.days
    .find((stateDay) => stateDay.id === day)
    .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
};


export const getInterview = function(state, interview) {
  return !interview ? null : { student: interview.student, interviewer: state.interviewers[interview.interviewer]};
};


