import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useBudget } from "./BudgetContext";

ChartJS.register(ArcElement, Tooltip, Legend);


function ExpenseChart() {

  // Prendiamo la lista delle spese dal BudgetContext
  const { expenses } = useBudget();

  // Creiamo un oggetto vuoto che useremo per sommare le spese per categoria
  const categories = {};

  // Cicliamo tutte le spese
  expenses.forEach((exp) => {

    // Se la categoria non esiste ancora nell'oggetto, viene inizializzata a 0
    // Poi aggiungiamo l'importo della spesa alla categoria corretta
    categories[exp.category] =
      (categories[exp.category] || 0) + exp.amount;
  });

  // Creiamo l'oggetto data che verrà passato al grafico
  const data = {

    // labels contiene i nomi delle categorie
    labels: Object.keys(categories),

    // datasets contiene i dati veri e propri del grafico
    datasets: [
      {
        // values contiene la somma delle spese per ogni categoria
        data: Object.values(categories),

        
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };

  // JSX che viene renderizzato a schermo
  return (
    
    <div className="card">
      <h2>Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;