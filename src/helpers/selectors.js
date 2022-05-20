export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  let dayObject = state.days.find((item) => item.name === day);

  if (!dayObject) {
    return [];
  }

  const results = dayObject.appointments.map(
    (appointment) => state.appointments[appointment]
  );

  return results;
}
