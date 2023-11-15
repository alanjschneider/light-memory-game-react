export default function createAudio(src) {
  const audio = new Audio(src);

  return {
    play() {
      if (audio.paused) return audio.play();

      const clone = audio.cloneNode();
      clone.play();

      clone.addEventListener(
        "pause",
        function () {
          clone.remove();
        },
        false
      );
    },
  };
}
