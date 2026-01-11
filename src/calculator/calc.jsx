// Gestione del punto decimale
export function handleDecimal(expr) {
  const parts = expr.split(/[\+\-\×\÷]/);
  const last = parts[parts.length - 1];

  if (last.includes(".")) return expr;
  if (expr === "") return "0.";

  return expr + ".";
}

// Gestione operatori
export function handleOperator(expr, op) {
  if (expr === "") return "";

  const last = expr.slice(-1);
  const operators = ["+", "-", "×", "÷"];

  if (operators.includes(last)) {
    return expr.slice(0, -1) + op;
  }

  return expr + op;
}

// Valutazione espressione
export function evaluateExpression(expr) {
  if (!expr) return 0;

  const jsExpr = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/");

  try {
    const result = Function(`return (${jsExpr})`)();
    return Math.round(result * 1e12) / 1e12;
  } catch {
    return "Err";
  }
}
