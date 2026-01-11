import { useState } from "react";
import { useBudget } from "./BudgetContext";

function IncomeList() {

  // Estraiamo dal context:
  // - incomes: lista dei guadagni
  // - removeIncome: funzione per eliminare un guadagno
  // - updateIncome: funzione per modificare un guadagno
  const { incomes, removeIncome, updateIncome } = useBudget();

  // Stato che memorizza l'id del guadagno in modifica
  const [editingId, setEditingId] = useState(null);

  // Stato che contiene i dati del guadagno in fase di modifica
  const [editData, setEditData] = useState({
    description: "", // descrizione del guadagno
    amount: "",      // importo
    date: "",        // data
  });

  // Stato che gestisce l'ordinamento
  const [sortOrder, setSortOrder] = useState("recent");

  // Funzione che avvia la modifica di un guadagno
  const startEdit = (inc) => {
    // Salviamo l'id del guadagno selezionato
    setEditingId(inc.id);

    // Copiamo i dati del guadagno nello stato editData
    setEditData({
      description: inc.description,
      amount: inc.amount,
      date: inc.date,
    });
  };

  // Funzione che salva le modifiche
  const saveEdit = (id) => {
    // Chiamiamo la funzione del context per aggiornare il guadagno
    updateIncome({
      id,
      description: editData.description,
      amount: Number(editData.amount),
      date: editData.date,
    });

    // Usciamo dalla modalità modifica
    setEditingId(null);
  };

  // Funzione che formatta la data da YYYY-MM-DD a DD-MM-YYYY
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // Ordiniamo i guadagni in base al filtro selezionato
  const sortedIncomes = [...incomes].sort((a, b) => {
    if (sortOrder === "recent") return b.id - a.id;     // più recenti
    if (sortOrder === "high") return b.amount - a.amount; // importo alto → basso
    if (sortOrder === "low") return a.amount - b.amount;  // importo basso → alto
    return 0;
  });

  // JSX renderizzato dal componente
  return (
    <div className="card">

      {/* Titolo e selettore di ordinamento affiancati */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2>Income List</h2>

        {/* Select per scegliere l'ordinamento */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            width: "135px",
            height: "45px",       // altezza del select
            padding: "4px 4px",   // spazio interno
            fontSize: "16px",     // dimensione del testo
          }}
        >
          <option value="recent">Recent</option>
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>
      </div>

      {/* Intestazione della tabella */}
      <div className="expense-table header">
        <span>Description</span>
        <span>Amount</span>
        <span>Actions</span>
      </div>

      {/* Messaggio se non ci sono guadagni */}
      {sortedIncomes.length === 0 && <p>No income added</p>}

      {sortedIncomes.map((inc) => (
        <div key={inc.id} className="expense-table row">

          <span>
            {editingId === inc.id ? (
              <>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />

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
                {inc.description} <br />
                <small>{formatDate(inc.date)}</small>
              </>
            )}
          </span>

          <span>
            {editingId === inc.id ? (
              <input
                type="number"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
              />
            ) : (
              `${inc.amount} €`
            )}
          </span>

          <div className="actions">
            {editingId === inc.id ? (
           
              <button
                className="action-btn"
                onClick={() => saveEdit(inc.id)}
              >
                💾
              </button>
            ) : (
              <button
                className="action-btn"
                onClick={() => startEdit(inc)}
              >
                ✏️
              </button>
            )}
            <button
              className="action-btn delete"
              onClick={() => {
                if (
                  window.confirm(
                    "Sei sicuro di non volere più visualizzare questo guadagno?"
                  )
                ) {
                  removeIncome(inc.id);
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
export default IncomeList;
