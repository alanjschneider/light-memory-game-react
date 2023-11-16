export default function createAudio(src) {
  const audio = new Audio(src);

  return {
    play() {
      if (audio.paused) return audio.play();

      // Multiple sounds playing on same time
      audio.cloneNode().play();
    },
  };
}
