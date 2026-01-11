import { useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import { evaluateExpression, handleDecimal, handleOperator } from "./calc";
import "./App.css";

export default function Calcolatrice({ onClose }) {
  const [display, setDisplay] = useState("");

  const handleInput = (value) => {
    if (value === "AC") {
      setDisplay("");
      return;
    }

    if (value === "⌫") {
      setDisplay((d) => d.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        const result = evaluateExpression(display);
        setDisplay(String(result));
      } catch {
        setDisplay("Err");
      }
      return;
    }

    if (value === ".") {
      setDisplay((d) => handleDecimal(d));
      return;
    }

    if (["+", "-", "×", "÷"].includes(value)) {
      setDisplay((d) => handleOperator(d, value));
      return;
    }

    setDisplay((d) => d + value);
  };

  return (
    <div className="calculator-overlay" onClick={onClose}>
      <div
        className="calculator-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "36px",
            height: "36px",
            borderRadius: "6px",          // quadrato leggermente arrotondato
            border: "1px solid white",
            background: "rgba(255, 0, 72, 0.9)",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10
          }}
        >
          ✕
        </button>

        <div className="calculator">
          <Display value={display} />
          <Keypad onPress={handleInput} />
        </div>
      </div>
    </div>
  );
}
