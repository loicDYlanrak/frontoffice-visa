import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Accueil from './pages/Accueil';
import ListeTest from './components/ListeTest';
import RechercheDemandeApp from "./components/Recherche";
import FicheDemande from "./components/FicheDemande";
import HistoStatutDemande from "./components/HistoStatutDemande";
import FichiersDetailDemande from "./components/FichiersDetailDemande";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/"        element={<Accueil />}             />
              <Route path="/tests"   element={<ListeTest />}           />
              <Route path="/recherche" element={<RechercheDemandeApp />} />
              <Route path="/fiche-demande/:id" element={<FicheDemande />} />
              <Route path="/histo-statut/:id" element={<HistoStatutDemande />} />
              <Route path="/fichiers-detail/:id" element={<FichiersDetailDemande />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;