export default function createAudio(src) {
  const context = new AudioContext();
  let buffer = null;

  fetch(src)
    .then((res) => res.arrayBuffer())
    .then((data) => context.decodeAudioData(data))
    .then((decoded) => {
      buffer = decoded;
    });

  return {
    play: function () {
      if (!buffer) return;

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    },
  };
}
