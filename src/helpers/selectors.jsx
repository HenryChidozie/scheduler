export const getAppointmentsForDay = (state, dayId) => {
  try {
    return state.days
    .find((stateDay) => stateDay.id === dayId)
    .appointments.map((appointmetId) => state.appointments[appointmetId]);
  } catch (err) {
    return [];
  }
};