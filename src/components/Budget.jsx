import { useState } from "react";
import { useBudget } from "./BudgetContext";

function Budget() {

  // Usiamo useBudget per prendere:budget: il valore attuale del budget totale
  const { budget, addIncome } = useBudget();

  // Stato per salvare l'importo del guadagno inserito dall'utente
  // All'inizio è una stringa vuota
  const [amount, setAmount] = useState("");

  // Stato per salvare la descrizione del guadagno
  const [description, setDescription] = useState("");

  // Stato per salvare la data del guadagno
  const [date, setDate] = useState("");

  // Funzione che viene eseguita quando si clicca sul pulsante "Add Income"
  const handleAdd = () => {

    // Controllo: se l'importo è vuoto oppure non è un numero valido
    // la funzione si interrompe e non fa nulla
    if (!amount || isNaN(amount)) return;

    // Chiamiamo la funzione addIncome per aggiungere un nuovo guadagno
    addIncome({
      // ID pseudo-unico basato sul timestamp attuale
      id: Date.now(),

      // Convertiamo l'importo da stringa a numero
      amount: Number(amount),

      // Se la descrizione è vuota, usiamo "No description"
      description: description || "No description",

      // Se la data è vuota, usiamo la data di oggi
      // toISOString() restituisce una data completa,
      // split("T")[0] prende solo la parte YYYY-MM-DD
      date: date || new Date().toISOString().split("T")[0]
    });

    // Dopo aver aggiunto il guadagno,
    // svuotiamo tutti i campi del form
    setAmount("");
    setDescription("");
    setDate("");
  };

  // Parte di JSX che descrive cosa viene mostrato a schermo
  return (
    
    <div className="card">
      <h2>Total Amount</h2>

      <p className="budget">{budget} €</p>

      <input
        type="number"            
        placeholder="€"            
        value={amount}             
        onChange={(e) => setAmount(e.target.value)} 
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleAdd}>Add Income</button>
    </div>
  );
}

export default Budget;
