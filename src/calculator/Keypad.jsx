const keys = [
  "(", ")", "⌫", "÷",
  "7", "8", "9", "×",
  "4", "5", "6", "+",
  "1", "2", "3", "-",
  "0", ".", "=", "AC"
];

export default function Keypad({ onPress }) {
  return (
    <div className="buttons">
      {keys.map((k, i) => {
        const cls =
          k === "AC" ? "clear" :
          k === "⌫" ? "back" :
          k === "=" ? "equal" :
          ["÷", "×", "-", "+", "(", ")"].includes(k) ? "operator" :
          "";

        return (
          <button
            key={i}
            className={cls}
            onClick={() => onPress(k)}
          >
            {k}
          </button>
        );
      })}
    </div>
  );
}
