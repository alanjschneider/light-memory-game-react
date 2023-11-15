export default function gameMachine(state, action) {
  switch (action.type) {
    case "START_GAME": {
      return { ...state, game: "MACHINE_TURN" };
    }
  }
}
