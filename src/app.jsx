import {
  useGame,
  MACHINE_TURN,
  PLAYER_TURN,
  PLAYER_ASSERT,
  PLAYER_MISS,
  WAITING_PLAYER,
} from './useGame';

import { randomPick } from './lib/utils';
import classes from './lib/classes';
import createAudio from './lib/audio';
import Button from './components/button';
import Light from './components/light';

import './app.css';

const assertMessages = [
  { scoreRange: [1, 3], messages: ['Ok', 'Good', 'Great'] },
  { scoreRange: [4, 7], messages: ['Well done!', 'Nice!', 'Wow!', 'Not bad!'] },
  { scoreRange: [8, 10], messages: ['Keep it up!', 'You got it!'] },
  { scoreRange: [11, 15], messages: ['You rock!!!', 'Amazing!!!', 'Wow!!!'] },
  {
    scoreRange: [16, Infinity],
    messages: [
      'ON FIRE!!!',
      'LEGENDARY!!!',
      'THIS IS INSANE!!!',
      'WHAT A BEAST!!!',
      'ARE YOU EVEN HUMAN?!',
      'GOD MODE ACTIVATED!!!',
      'YOU BROKE THE GAME!!!',
    ],
  },
];

const missMessages = [
  {
    scoreRange: [0, 2],
    messages: ['Do you have a brain?', 'Are you even trying?', 'Really?'],
  },
  {
    scoreRange: [3, 6],
    messages: ['Hey! Pay attention...', 'Oops...', 'Focus!'],
  },
  {
    scoreRange: [7, 10],
    messages: ['Try again!', 'Wrong!'],
  },
  {
    scoreRange: [11, Infinity],
    messages: ['Try again!', 'Wrong!', 'Nooo!!!', 'So close!!!', 'Oh no!!!'],
  },
];

const sounds = [
  createAudio('./synthC4.mp3'),
  createAudio('./synthC5.mp3'),
  createAudio('./synthC6.mp3'),
  createAudio('./synthC7.mp3'),
  createAudio('./synthC1.mp3'),
];

function App() {
  let { gameState, lights, startGame, pushLightPressed, score } =
    useGame(sounds);

  function handleLightPressed(id) {
    if (gameState !== PLAYER_TURN) return; // Prevent
    pushLightPressed(id);
    sounds[id].play();
  }

  function getMessageByState(gameState) {
    switch (gameState) {
      case MACHINE_TURN:
        return 'Memorize the pattern';
      case PLAYER_TURN:
        return 'Your turn';
      case PLAYER_ASSERT:
        return getRandomMessageByScore(assertMessages, score);
      case PLAYER_MISS:
        return getRandomMessageByScore(missMessages, score);
    }
  }

  function getRandomMessageByScore(messages, score) {
    for (const message of messages) {
      const [min, max] = message.scoreRange;
      if (score >= min && score <= max) return randomPick(message.messages);
    }
  }

  return (
    <div className="App">
      {gameState === WAITING_PLAYER && (
        <Button value="Play" onClick={startGame} />
      )}
      <h1
        style={{ color: '#FFF' }}
        className={classes({
          'Rotate-And-Scale':
            gameState === PLAYER_ASSERT || gameState === PLAYER_MISS,
        })}
      >
        {getMessageByState(gameState)}
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

      {gameState !== WAITING_PLAYER && (
        <div className="Score">
          Score <span>{score}</span>
        </div>
      )}
    </div>
  );
}

export default App;
