import { useState } from "react";
import { useBudget } from "./BudgetContext";

const categories = [
  "Casa",
  "Famiglia",
  "Vestiti",
  "Spesa",
  "Viaggi",
  "Regalo",
  "Altro",
];

function ExpenseForm() {

  // Prendiamo la funzione addExpense dal BudgetContext
  // Serve per aggiungere una nuova spesa
  const { addExpense } = useBudget();

  // Stato per la descrizione della spesa
  const [description, setDescription] = useState("");

  // Stato per la categoria selezionata
  // Di default è impostata su "Casa"
  const [category, setCategory] = useState("Casa");

  // Stato per l'importo della spesa
  const [amount, setAmount] = useState("");

  // Stato per la data della spesa
  const [date, setDate] = useState("");

  // Funzione chiamata quando il form viene inviato
  const handleSubmit = (e) => {

    // Impedisce il comportamento predefinito del form
    // (cioè il refresh della pagina)
    e.preventDefault();

    // Se manca uno dei campi obbligatori, la funzione termina
    if (!description || !amount || !date) return;

    // Chiamiamo addExpense passando i dati della spesa
    addExpense({
      description,           
      category,              
      amount: Number(amount),
      date,                  
    });

    // Reset dei campi del form dopo l'invio
    setDescription("");
    setAmount("");
    setDate("");
  };

  // JSX che viene renderizzato a schermo
  return (

    <div className="card">

      <h2>Add expense</h2>

      {/* Form HTML */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          
          {categories.map((cat) => (  /* Creiamo un'opzione per ogni categoria */
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="€"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button>Add</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
