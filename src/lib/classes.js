export default function classes(obj) {
  const list = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === true) list.push(key);
  }

  return list.join(" ");
}
