import { useState, useEffect } from 'react'
import Light from './components/light';
import createAudio from './lib/audio';
import './app.css'

// TODO: messages by number of pattern
// example: if player miss on patter number 1, 
// the message must be humulliating.
// if player miss on pattern number 5,
// message must be more positive

// TODO: Animate h1 to be more cool (rotations, scales, colors)

const OFF = 0;
const ON = 1;
const TIME = 500;

const MACHINE_TURN = 0;
const PLAYER_TURN = 1;
const PLAYER_MISS = 2;
const PLAYER_ASSERT = 3;
const WAITING_PLAYER = 4;

const assertMessages = [
  'You rock!',
  'We have a genius here',
  'Amazing!',
  'Wow!',
  'Nice!'
];

const missMessages = [
  'Ups...',
  'That\'s so sad',
  'Common men...',
  'Really?',
  'Hey! pay attention...'
];

let intervalID;

function random(max) {
  return ~~(Math.random() * max);
}

const sound  = [];

const missSound = createAudio('./synthC1.mp3');

function App() {
  let [state, setState] = useState(WAITING_PLAYER);
  const [lights, setLights] = useState([
    {id: 0, color: 'red', state: OFF},
    {id: 1, color: 'green', state: OFF},
    {id: 2, color: 'blue', state: OFF},
    {id: 3, color: 'yellow', state: OFF},
  ]);
  let [pattern, setPattern] = useState([random(lights.length)]);
  const [lightsPressed, setLightsPressed] = useState([]);

  useEffect(() => {
    if (state === MACHINE_TURN) {
      let count = 0;

      intervalID = setInterval(() => {
        const id = pattern[count];
        setLights((lights) => lights.map(light => light.id === id ? {...light, state: ON} : {...light, state: OFF}));
        sound[id].play();
  
        setTimeout(() => {
          setLights((lights) => lights.map(light => ({...light, state: OFF})));
          if (count >= pattern.length) {
            setState(PLAYER_TURN);
          }
        }, TIME);

        count++;
      }, TIME + TIME / 2);
    } else if (state === PLAYER_TURN) {
      clearInterval(intervalID);

      // If miss, restart:
      if (lightsPressed[lightsPressed.length - 1] !== pattern[lightsPressed.length - 1]) {
        setTimeout(() => {
          setLightsPressed([]);
          setPattern([random(lights.length)]);
          setState(PLAYER_MISS);
          missSound.play();
          setTimeout(() => setState(MACHINE_TURN), 1000);
        }, 250);
        return;
      }

      if (lightsPressed.length === pattern.length) {
        setTimeout(() => {
          setState(PLAYER_ASSERT)
          setPattern(prevPattern => [...prevPattern, random(lights.length)]);
          setTimeout(() => setState(MACHINE_TURN), 1000);
          setLightsPressed([]);
        }, 250);
      }
    }

    return () => {
      clearInterval(intervalID);
    }
  }, [state, lightsPressed]);

  function handleLightPressed(id) {
    if (state !== PLAYER_TURN) return; // Prevent 
    setLightsPressed(prevLightsPressed => [...prevLightsPressed, id]);
    sound[id].play();
  }

  function startGame() {
    sound.push(
      createAudio('./synthC4.mp3'),
      createAudio('./synthC5.mp3'),
      createAudio('./synthC6.mp3'),
      createAudio('./synthC7.mp3')
    );
    setState(MACHINE_TURN);
  }

  return (
    <div className='App'>
      {state === WAITING_PLAYER && <button onClick={startGame}>Play</button>}
      <h1 style={{color: 'white'}}>
        {state === MACHINE_TURN && 'Memorize the pattern'}
        {state === PLAYER_TURN && 'Your turn'}
        {state === PLAYER_MISS && missMessages[random(missMessages.length)]}
        {state === PLAYER_ASSERT && assertMessages[random(assertMessages.length)]}
      </h1>
      <div className='Row'>
        {lights.slice(0, 2).map(light => <Light key={light.id} {...light} onClick={handleLightPressed} />)}
      </div>
      <div className='Row'>
        {lights.slice(2).map(light => <Light key={light.id} {...light} onClick={handleLightPressed} />)}
      </div>
    </div>
  )
}

export default App
