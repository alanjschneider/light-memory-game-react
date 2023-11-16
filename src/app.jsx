import {
  useGame,
  MACHINE_TURN,
  PLAYER_TURN,
  PLAYER_ASSERT,
  PLAYER_MISS,
  WAITING_PLAYER,
} from "./useGame";

import { randomPick } from "./lib/utils";
import classes from "./lib/classes";
import createAudio from "./lib/audio";
import Button from "./components/button";
import Light from "./components/light";

import "./app.css";

const assertMessages = [
  "Ok",
  "Good",
  "Great",
  "Well done!",
  "Nice!",
  "Wow!",
  "You rock!!!",
  "Amazing!!!",
  "Wow!!!",
];

const missMessages = [
  "Really?",
  "Do you have brain?",
  "Hey! pay attention...",
  "Ups...",
  "Nooo!!!",
];

const sounds = [
  createAudio("./synthC4.mp3"),
  createAudio("./synthC5.mp3"),
  createAudio("./synthC6.mp3"),
  createAudio("./synthC7.mp3"),
  createAudio("./synthC1.mp3"),
];

function App() {
  let [state, lights, startGame, pushLightPressed] = useGame(sounds);

  function handleLightPressed(id) {
    if (state !== PLAYER_TURN) return; // Prevent
    pushLightPressed(id);
    sounds[id].play();
  }

  function getMessageByState(state) {
    switch (state) {
      case MACHINE_TURN:
        return "Memorize the patter";
      case PLAYER_TURN:
        return "Your turn";
      case PLAYER_ASSERT:
        return randomPick(assertMessages);
      case PLAYER_MISS:
        return randomPick(missMessages);
    }
  }
  return (
    <div className="App">
      {state === WAITING_PLAYER && <Button value="Play" onClick={startGame} />}
      <h1
        style={{ color: "#FFF" }}
        className={classes({
          "Rotate-And-Scale": state === PLAYER_ASSERT || state === PLAYER_MISS,
        })}
      >
        {getMessageByState(state)}
      </h1>

      <div className="Row">
        {lights.slice(0, 2).map((light) => (
          <Light key={light.id} {...light} onClick={handleLightPressed} />
        ))}
      </div>
      <div className="Row">
        {lights.slice(2).map((light) => (
          <Light key={light.id} {...light} onClick={handleLightPressed} />
        ))}
      </div>
    </div>
  );
}

export default App;
