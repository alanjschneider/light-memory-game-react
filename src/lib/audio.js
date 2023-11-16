export default function createAudio(src) {
  const audio = new Audio(src);

  return {
    // Multiple sounds playing on same time
    play: () => (audio.paused ? audio.play() : audio.cloneNode().play()),
  };
}
