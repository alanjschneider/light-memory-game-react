import { useState } from "react";

export default function useMachine(machine, state) {
  const [state, setState] = useState(state);

  function send(action) {
    setState((prevState) => machine(prevState, action));
  }

  return [state, send];
}
