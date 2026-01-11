import { useEffect, useState } from "react";

// Definizione del componente Navbar
// Riceve come props:
// - toggleTheme: funzione per cambiare tema (chiaro/scuro)
// - currentTheme: tema attuale ("light" o "dark")
// - onCalcClick: funzione che apre/chiude la calcolatrice
function Navbar({ toggleTheme, currentTheme, onCalcClick }) {

  // Stato che contiene la data e ora attuali
  const [now, setNow] = useState(new Date());

  // useEffect viene eseguito una volta quando il componente viene montato
  useEffect(() => {

    // Impostiamo un timer che aggiorna l'orario ogni secondo
    const timer = setInterval(() => setNow(new Date()), 1000);

    // Cleanup: quando il componente viene smontato
    // fermiamo il timer per evitare memory leak
    return () => clearInterval(timer);
  }, []); // array vuoto = eseguito solo una volta

  // JSX renderizzato dalla navbar
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div className="navbar-left">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* Titolo / logo dell'app */}
            <h1 className="logo">ExpenseTracker</h1>

            {/* PULSANTE CALCOLATRICE */}
            <button
              className="action-btn"     // classe CSS
              onClick={onCalcClick}      // funzione chiamata al click
              title="Apri calcolatrice"  // tooltip
              style={{ padding: "6px" }} // stile inline
            >

              {/* Icona SVG della calcolatrice */}
              <svg
                // Cambia colore in base al tema
                fill={currentTheme === "light" ? "#000000" : "#ffffff"}
                width="24px"
                height="24px"
                viewBox="0 0 1920 1920"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Disegno vero e proprio dell'icona */}
                <path
                  d="M480 0h960c176.731 0 320 143.269 320 320v1280c0 176.731-143.269 320-320 320H480c-176.731 0-320-143.269-320-320V320C160 143.269 303.269 0 480 0Zm106.667 213.333c-117.821 0-213.334 95.513-213.334 213.334 0 117.82 95.513 213.333 213.334 213.333h746.666c117.821 0 213.334-95.513 213.334-213.333 0-117.821-95.513-213.334-213.334-213.334H586.667ZM480 853.333c-58.91 0-106.667 47.757-106.667 106.667 0 58.91 47.757 106.667 106.667 106.667h106.667c58.91 0 106.666-47.757 106.666-106.667 0-58.91-47.756-106.667-106.666-106.667H480Zm426.667 0C847.757 853.333 800 901.09 800 960c0 58.91 47.756 106.667 106.667 106.667h106.666c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.756-106.667-106.667-106.667H906.667Zm426.666 0c-58.91 0-106.666 47.757-106.666 106.667 0 58.91 47.756 106.667 106.666 106.667H1440c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.757-106.667-106.667-106.667h-106.667Zm-853.333 320c-58.91 0-106.667 47.757-106.667 106.667 0 58.91 47.757 106.667 106.667 106.667h106.667c58.91 0 106.666-47.757 106.666-106.667 0-58.91-47.756-106.667-106.666-106.667H480Zm426.667 0C847.757 1173.333 800 1221.09 800 1280c0 58.91 47.756 106.667 106.667 106.667h106.666c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.756-106.667-106.667-106.667H906.667Zm426.666 0c-58.91 0-106.666 47.757-106.666 106.667 0 58.91 47.756 106.667 106.666 106.667H1440c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.757-106.667-106.667-106.667h-106.667Zm-853.333 320c-58.91 0-106.667 47.757-106.667 106.667 0 58.91 47.757 106.667 106.667 106.667h106.667c58.91 0 106.666-47.757 106.666-106.667 0-58.91-47.756-106.667-106.666-106.667H480Zm426.667 0C847.757 1493.333 800 1541.09 800 1600c0 58.91 47.756 106.667 106.667 106.667h106.666c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.756-106.667-106.667-106.667H906.667Zm426.666 0c-58.91 0-106.666 47.757-106.666 106.667 0 58.91 47.756 106.667 106.666 106.667H1440c58.91 0 106.667-47.757 106.667-106.667 0-58.91-47.757-106.667-106.667-106.667h-106.667Z"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Data e ora in tempo reale */}
          <div className="datetime">
            <span>{now.toLocaleDateString()}</span>
            <span>{now.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Pulsante per cambiare tema */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
