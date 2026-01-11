export default function Display({ value }) {
  return <div className="display">{value || "0"}</div>;
}
