import { useState, useEffect } from 'react';
import { random } from './lib/utils';

export const MACHINE_TURN = 0;
export const PLAYER_TURN = 1;
export const PLAYER_MISS = 2;
export const PLAYER_ASSERT = 3;
export const WAITING_PLAYER = 4;

const OFF = 0;
const ON = 1;
const TIME = 500;

let intervalID;

export function useGame(sounds) {
  const [lights, setLights] = useState([
    { id: 0, color: 'red', state: OFF },
    { id: 1, color: 'green', state: OFF },
    { id: 2, color: 'blue', state: OFF },
    { id: 3, color: 'yellow', state: OFF },
  ]);

  let [score, setScore] = useState(0);
  let [lightsPressed, setLightsPressed] = useState([]);
  let [gameState, setGameState] = useState(WAITING_PLAYER);
  let [pattern, setPattern] = useState([random(lights.length)]);

  useEffect(() => {
    if (gameState === MACHINE_TURN) {
      executeMachineTurn();
    } else if (gameState === PLAYER_TURN) {
      executePlayerTurn();
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [gameState, lightsPressed]);

  function executeMachineTurn() {
    let count = 0;

    intervalID = setInterval(() => {
      const id = pattern[count];
      setLights((lights) =>
        lights.map((light) =>
          light.id === id ? { ...light, state: ON } : { ...light, state: OFF }
        )
      );
      sounds[id].play();

      setTimeout(() => {
        setLights((lights) =>
          lights.map((light) => ({ ...light, state: OFF }))
        );
        if (count >= pattern.length) {
          setGameState(PLAYER_TURN);
        }
      }, TIME);

      count++;
    }, TIME + TIME / 2);
  }

  function executePlayerTurn() {
    clearInterval(intervalID);

    const lastIndex = lightsPressed.length - 1;

    // If miss, restart:
    if (lightsPressed[lastIndex] !== pattern[lastIndex]) {
      setTimeout(() => {
        setLightsPressed([]);
        setPattern([random(lights.length)]);
        setGameState(PLAYER_MISS);
        sounds[4].play(); // Miss sound
        setTimeout(() => setGameState(MACHINE_TURN), 1000);
        setScore(0);
      }, 250);
      return;
    }

    if (lightsPressed.length === pattern.length) {
      setTimeout(() => {
        setGameState(PLAYER_ASSERT);
        setPattern((prevPattern) => [...prevPattern, random(lights.length)]);
        setTimeout(() => setGameState(MACHINE_TURN), 1000);
        setLightsPressed([]);
        setScore((prev) => prev + 1);
      }, 250);
    }
  }

  function pushLightPressed(id) {
    setLightsPressed((prevLightsPressed) => [...prevLightsPressed, id]);
  }

  function startGame() {
    setGameState(MACHINE_TURN);
  }

  return { gameState, lights, startGame, pushLightPressed, score };
}
