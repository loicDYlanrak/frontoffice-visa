import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Accueil from "./components/Accueil";
import RechercheDemandeApp from "./components/Recherche";
import FicheDemande from "./components/FicheDemande";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/"           element={<Accueil />}             />
              <Route path="/recherche"  element={<RechercheDemandeApp />} />
              <Route path="/fiche-demande/:id" element={<FicheDemande />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;