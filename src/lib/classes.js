export default function classes(obj) {
  return Object.entries(obj)
    .map(([key, value]) => (value === true ? key : ""))
    .join(" ");
}
