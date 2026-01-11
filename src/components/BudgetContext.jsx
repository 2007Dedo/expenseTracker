import { createContext, useContext, useEffect, useState } from "react";

// Creiamo il contesto per il budget, le spese e i guadagni
const BudgetContext = createContext();

// Funzione ausiliaria per trovare un ID libero per nuove spese o guadagni
// Garantisce che gli ID siano numeri sequenziali e riutilizza eventuali "buchi"

const getFreeId = (items) => {
  const ids = items.map(i => i.id).sort((a, b) => a - b); // Mappiamo tutti gli ID esistenti e li ordiniamo dal più piccolo al più grande
  for (let i = 0; i < ids.length; i++) { // Controlliamo ogni indice: se manca un numero, quello è il primo ID libero
    if (ids[i] !== i) return i;
  }
  return ids.length;
};

// Creiamo il provider che conterrà tutti i dati e le funzioni condivise
export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(() =>
    Number(localStorage.getItem("budget")) || 1000 //budget di base
  );

  const [expenses, setExpenses] = useState(() => // Stato delle spese, inizializzato dal localStorage o a array vuoto
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  const [incomes, setIncomes] = useState(() => // Stato dei guadagni, inizializzato dal localStorage o a array vuoto
    JSON.parse(localStorage.getItem("incomes")) || []
  );

  /* =======================
     SYNC LOCALSTORAGE
  ======================= */
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  /* =======================
     EXPENSES
  ======================= */
  const addExpense = (expense) => {
    if (expense.amount > budget) {
      alert("Budget insufficiente!");
      return;
    }

    const id = getFreeId(expenses);

    const newExpense = {
      id,
      description: expense.description,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    };

    // Inseriamo la nuova spesa **in cima all'array**
    // [...prev] = vecchie spese
    // { ...expense, id } = nuova spesa
    setExpenses(prev => [...prev, newExpense]); 
    setBudget(prev => prev - expense.amount);  // Aggiorniamo il budget sottraendo l'importo della nuova spesa
  };

  const removeExpense = (id) => { //// Filtriamo l'array delle spese eliminando quella con l'ID specificato
    const exp = expenses.find(e => e.id === id);
    if (!exp) return;

    setExpenses(prev => prev.filter(e => e.id !== id));
    //setBudget(prev => prev + exp.amount);
  };

  const updateExpense = (updated) => {
  const old = expenses.find(e => e.id === updated.id);
  if (!old) return;

  const diff = updated.amount - old.amount;

  setExpenses(prev =>
    prev.map(e =>
      e.id === updated.id
        ? {
            id: updated.id,
            description: updated.description,
            category: updated.category,
            amount: updated.amount,
            date: updated.date,
          }
        : e
    )
  );

    setBudget(prev => prev - diff);
  };


  /* =======================
     INCOMES
  ======================= */
  const addIncome = (income) => {
    if (income.amount <= 0) return;

    const id = getFreeId(incomes);

    setIncomes(prev => [...prev, { ...income, id }]); // Inseriamo il guadagno in cima all'array
    setBudget(prev => prev + income.amount); // Aggiorniamo il budget sommando l'importo
  };

  const removeIncome = (id) => {
    const inc = incomes.find(i => i.id === id);
    if (!inc) return;

    setIncomes(prev => prev.filter(i => i.id !== id));
    //setBudget(prev => prev - inc.amount);
  };

  const updateIncome = (updated) => {
    const old = incomes.find(i => i.id === updated.id);
    if (!old) return;

    setIncomes(prev =>
      prev.map(i => i.id === updated.id ? updated : i)
    );
    setBudget(prev => prev + (updated.amount - old.amount)); // Aggiorniamo il budget aggiungendo la differenza tra nuovo e vecchio importo
  };


  // RETURN DEL PROVIDER
  //Forniamo tutte le variabili e funzioni ai componenti figli
  return (
    <BudgetContext.Provider
      value={{
        budget,
        expenses,
        incomes,
        addExpense,
        removeExpense,
        updateExpense,
        addIncome,
        removeIncome,
        updateIncome,
      }}
    >
      {children}
    </BudgetContext.Provider> //il Provider è un contenitore che permette a tutti i componenti figli di accedere ai dati e alle funzioni del contesto.
  );
}

// Hook personalizzato per usare il contesto in qualsiasi componente
export const useBudget = () => useContext(BudgetContext);
