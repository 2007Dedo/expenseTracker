import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useBudget } from "./BudgetContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function IncomeChart() {

  // Prendiamo la lista dei guadagni dal context
  const { incomes } = useBudget();

  // Oggetto che servirà per raggruppare i guadagni per data
  const groupedIncomes = {};

  // Cicliamo su tutti i guadagni
  incomes.forEach((inc) => {

    // Prendiamo la data del guadagno
    // Se non esiste usiamo "Sconosciuta"
    const date = inc.date || "Sconosciuta";

    // Se la data esiste già sommiamo l'importo
    // Altrimenti inizializziamo il valore
    groupedIncomes[date] = (groupedIncomes[date] || 0) + inc.amount;
  });

  // Otteniamo tutte le date come array e le ordiniamo
  const sortedDates = Object.keys(groupedIncomes).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Creiamo le etichette nel formato giorno-mese-anno
  const labels = sortedDates.map((date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  });

  // Dati del grafico
  const data = {
    labels, // Etichette sull'asse X
    datasets: [
      {
        label: "Income (€)", // Nome del dataset
        data: sortedDates.map((date) => groupedIncomes[date]), // Valori
        backgroundColor: "#36A2EB", // Colore delle barre
      },
    ],
  };

  // Opzioni del grafico
  const options = {
    responsive: true, // Grafico adattabile allo schermo
    plugins: {
      legend: { display: false }, // Nasconde la legenda
    },
    scales: {
      y: { beginAtZero: true }, // Asse Y parte da zero
    },
  };

  // JSX renderizzato
  return (
    <div className="card">
      <h2>Income Chart</h2>

      {/* Grafico a barre */}
      <Bar data={data} options={options} />
    </div>
  );
}

export default IncomeChart;