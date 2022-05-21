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

export function getInterviewersForDay(state, day) {
  let dayObject = state.days.find((item) => item.name === day);

  if (!dayObject) {
    return [];
  }

  let results = dayObject.appointments.map(
    (appointment) => state.appointments[appointment].interview.interviewer
  );

  results = results.flat(Infinity);
  results = results.filter((x) => x !== null);

  const interviewers = interviewers.map((y) => state.interviewers[y]);

  return interviewers;
}

export function getInterview(state, interview) {
  // interview object is given
  // state.appointments gives me all the appointments
  //
  if (!interview) {
    return null;
  }
  let result = {};
  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interview.interviewer];

  return result;
}
