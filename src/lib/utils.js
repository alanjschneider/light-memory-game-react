export function random(max) {
  return ~~(Math.random() * max);
}

export function randomRange(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

export function randomPick(array) {
  return array[~~(Math.random() * array.length)];
}
