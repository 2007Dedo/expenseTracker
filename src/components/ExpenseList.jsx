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

function ExpenseList() {

  // Prendiamo dal context:
  // - expenses → lista delle spese
  // - removeExpense → funzione per eliminare una spesa
  // - updateExpense → funzione per modificare una spesa
  const { expenses, removeExpense, updateExpense } = useBudget();

  // Stato che indica quale spesa stiamo modificando
  // Contiene l'id della spesa oppure null
  const [editingId, setEditingId] = useState(null);

  // Stato che contiene i dati temporanei della spesa in modifica
  const [editData, setEditData] = useState({
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  // Stato per l'ordinamento (recent, high, low)
  const [sortOrder, setSortOrder] = useState("recent");

  // Stato per il filtro categoria
  const [categoryFilter, setCategoryFilter] = useState("All");

  /* =======================
     EDIT
  ======================= */

  // Funzione che avvia la modifica di una spesa
  const startEdit = (exp) => {
    // Salviamo l'id della spesa che stiamo modificando
    setEditingId(exp.id);

    // Copiamo i dati della spesa nello stato editData
    setEditData({
      description: exp.description,
      category: exp.category,
      amount: exp.amount,
      date: exp.date,
    });
  };

  // Funzione che salva le modifiche
  const saveEdit = (id) => {
    // Chiamiamo updateExpense passando i nuovi dati
    updateExpense({
      id,
      description: editData.description,
      category: editData.category,
      amount: Number(editData.amount),
      date: editData.date,
    });

    // Uscita dalla modalità modifica
    setEditingId(null);
  };

  // Funzione per formattare la data (YYYY-MM-DD → DD-MM-YYYY)
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  /* =======================
     FILTER & SORT
  ======================= */

  // Filtriamo le spese in base alla categoria selezionata
  const filteredExpenses =
    categoryFilter === "All"
      ? expenses
      : expenses.filter(exp => exp.category === categoryFilter);

  // Ordiniamo le spese filtrate
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortOrder === "recent") return b.id - a.id;
    if (sortOrder === "high") return b.amount - a.amount;
    if (sortOrder === "low") return a.amount - b.amount;
    return 0;
  });

  // JSX che viene renderizzato
  return (
    // Contenitore principale
    <div className="card">

      {/* Titolo e filtri */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <h2>Expenses made</h2>

        {/* Select per ordinamento */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ width: "135px", height: "45px" }}
        >
          <option value="recent">Recent</option>
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>

        {/* Select per filtro categoria */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ width: "145px", height: "45px" }}
        >
          <option value="All">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="expense-table header">
        <span>Description</span>
        <span>Amount</span>
        <span>Actions</span>
      </div>

      {sortedExpenses.length === 0 && (
        <p>No expense for selected filters</p>
      )}

      {/* Ciclo sulle spese */}
      {sortedExpenses.map((exp) => (
        <div key={exp.id} className="expense-table row">

          <span>
            {editingId === exp.id ? (
              <>
                <input
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                {exp.description} <br />
                <small>{exp.category}</small> <br />
                <small>{formatDate(exp.date)}</small>
              </>
            )}
          </span>

          <span>
            {editingId === exp.id ? (
              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
              />
            ) : (
              `${exp.amount} €`
            )}
          </span>

          <div className="actions">
            {editingId === exp.id ? (
              <button
                className="action-btn"
                onClick={() => saveEdit(exp.id)}
              >
                💾
              </button>
            ) : (
              <button
                className="action-btn"
                onClick={() => startEdit(exp)}
              >
                ✏️
              </button>
            )}

            <button
              className="action-btn delete"
              onClick={() => {
                if (
                  window.confirm(
                    "Sei sicuro di non volere più visualizzare questa spesa?"
                  )
                ) {
                  removeExpense(exp.id);
                }
              }}
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
