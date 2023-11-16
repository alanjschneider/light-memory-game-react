import {
  useGame,
  MACHINE_TURN,
  PLAYER_TURN,
  PLAYER_ASSERT,
  PLAYER_MISS,
  WAITING_PLAYER
} from './useGame';

import { randomPick } from './lib/utils';
import classes from './lib/classes';
import createAudio from './lib/audio';
import Button from './components/button';
import Light from './components/light';

import './app.css';

const assertMessages = [
  'Ok',
  'Good',
  'Great',
  'Well done!',
  'Nice!',
  'Wow!',
  'You rock!!!',
  'Amazing!!!',
  'Wow!!!',
];

const missMessages = [
  'Really?',
  'Do you have brain?',
  'Hey! pay attention...',
  'Ups...',
  'Nooo!!!',
];

const sounds  = [
  createAudio('./synthC4.mp3'),
  createAudio('./synthC5.mp3'),
  createAudio('./synthC6.mp3'),
  createAudio('./synthC7.mp3'),
  createAudio('./synthC1.mp3')
];


function App() {
  let [state, lights, startGame, pushLightPressed] = useGame(sounds);
  
  function handleLightPressed(id) {
    if (state !== PLAYER_TURN) return; // Prevent 
    pushLightPressed(id);
    sounds[id].play();
  }
  
  return (
    <div className='App'>
      {state === WAITING_PLAYER && <Button value='Play' onClick={startGame}/>}
      <h1
        className={classes({
          'Rotate-And-Scale': state === PLAYER_ASSERT || state === PLAYER_MISS
        })
        }
        style={{color: '#FFF'}}>
          {state === MACHINE_TURN && 'Memorize the pattern'}
          {state === PLAYER_TURN && 'Your turn'}
          {state === PLAYER_ASSERT && randomPick(assertMessages)}
          {state === PLAYER_MISS && randomPick(missMessages)}
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
