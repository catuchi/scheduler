import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      history.pop();
      setHistory([...history, newMode]);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
    // setMode(newMode);
    // setHistory((prev) => {
    //   if (replace) {
    //     let x = [...prev];
    //     x.splice(-1, 1, newMode);

    //     return x;
    //   }
    //   return [...prev, newMode];
    // });
  }

  function back() {
    if (history.length === 1) {
      return;
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, history.length - 1));
    }
    // if (history.length > 1) {
    //   setHistory((prev) => [...prev].slice(0, -1));
    //   setMode(history[history.length - 2]);
    // }
  }

  return { mode, transition, back };
}
