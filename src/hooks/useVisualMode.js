import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory((prev) => {
      if (replace) {
        let x = [...prev];
        x.splice(-1, 1, newMode);

        return x;
      }
      return [...prev, newMode];
    });
  }

  function back() {
    setHistory((prev) => [...prev].slice(0, -1));
    setMode(history[history.length - 2]);
  }

  return { mode, transition, back };
}
