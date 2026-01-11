import { useState } from "react";
import Navbar from "./components/Navbar";
import ExpenseForm from "./components/ExpenseForm";
import Budget from "./components/Budget";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import IncomeList from "./components/IncomeList";
import IncomeChart from "./components/IncomeChart";

import Calcolatrice from "./calculator/Calcolatrice"; // ✅ IMPORT CORRETTO
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [showCalc, setShowCalc] = useState(false);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`app ${theme}`}>
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} onCalcClick={() => setShowCalc(true)} />

      <div className="container">
        <div className="top">
          <ExpenseForm />
          <Budget />
        </div>

        <div className="bottom">
          <ExpenseList />
          <ExpenseChart />
          <IncomeList />
          <IncomeChart />
        </div>
      </div>

      {showCalc && <Calcolatrice onClose={() => setShowCalc(false)} />}
    </div>
  );
}

export default App;
