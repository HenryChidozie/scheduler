export const getAppointmentsForDay = (state, dayId) => {
  try {
    return state.days
    .find((stateDay) => stateDay.id === dayId)
    .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
};