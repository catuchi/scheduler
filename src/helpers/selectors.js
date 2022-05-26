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

  return dayObject.interviewers.map(
    (interviewerId) => state.interviewers[interviewerId]
  );
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let result = {};
  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interview.interviewer];

  return result;
}
