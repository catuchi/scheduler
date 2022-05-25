import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.error(err));
  }, []);

  function countSpots(state) {
    const currentDay = state.days.find((item) => item.name === state.day);
    const appointmentIds = currentDay.appointments;

    const spots = appointmentIds.filter(
      (id) => !state.appointments[id].interview
    ).length;

    return spots;
  }

  function updateSpots(state, appointments) {
    const updatedState = { ...state, appointments };
    const updatedDays = [...state.days];
    const updatedDay = { ...state.days.find((day) => day.name === state.day) };

    // const spots = countSpots(state);
    const spots = countSpots(updatedState);
    updatedDay.spots = spots;

    const updatedDayIndex = state.days.findIndex(
      (day) => day.name === state.day
    );
    updatedDays[updatedDayIndex] = updatedDay;

    // updatedState.days = updatedDays;

    return updatedDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = updateSpots(state, appointments);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          days: newDays,
          appointments,
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = updateSpots(state, appointments);
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        days: newDays,
        appointments,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
