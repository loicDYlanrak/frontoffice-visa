import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Accueil from './pages/Accueil';
import ListeTest from './components/ListeTest';
import RechercheDemandeApp from "./components/Recherche";

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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;