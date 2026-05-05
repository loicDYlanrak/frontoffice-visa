import { useState } from "react";
import { rechercherParNumeroDemande, rechercherParPasseport } from "../services/api";
import { separerDemandePrincipaleEtAssociees, trierDemandesChronologique } from "../utils/listProcessing";
import ListeDemande from "./ListeDemande";

function RechercheDemandeApp() {
  const [numeroDemande, setNumeroDemande] = useState("");
  const [numeroPasseport, setNumeroPasseport] = useState("");
  const [demandePrincipale, setDemandePrincipale] = useState([]);
  const [demandesAssociees, setDemandesAssociees] = useState([]);
  const [erreur, setErreur]   = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode]       = useState(""); // "demande" ou "passeport"

  const handleRecherche = async () => {
    setErreur("");
    setDemandePrincipale([]);
    setDemandesAssociees([]);

    if (!numeroDemande && !numeroPasseport) {
      setErreur("Aucune demande trouvée");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (numeroDemande) {
        setMode("demande");
        res = await rechercherParNumeroDemande(numeroDemande);

        const { principale, associees } = separerDemandePrincipaleEtAssociees(res.data);
        setDemandePrincipale(principale);
        setDemandesAssociees(associees);
        console.log("Données reçues :", res.data);

      } else {
        setMode("passeport");
        res = await rechercherParPasseport(numeroPasseport);

        const triees = trierDemandesChronologique(res.data);
        setDemandePrincipale(triees);
      }

    } catch (err) {
      if (err.response?.status === 404) {
        setErreur("Aucune demande trouvée");
      } else {
        setErreur("❌ Erreur serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liste-test">
      <h2>Recherche de demande</h2>

      <div className="search-form">
        <input
          value={numeroDemande}
          onChange={(e) => setNumeroDemande(e.target.value)}
          placeholder="Numéro de demande (ex: 123)"
        />
        <input
          value={numeroPasseport}
          onChange={(e) => setNumeroPasseport(e.target.value)}
          placeholder="Numéro de passeport (ex: C12345)"
        />
        <button onClick={handleRecherche} className="btn-submit">
          Rechercher
        </button>
      </div>

      {loading && <div className="loading">⏳ Poursuite de la recherche en cours...</div>}
      {erreur   && <div className="error">{erreur}</div>}

      {/* Recherche par numéro demande */}
      {mode === "demande" && demandePrincipale.length > 0 && (
        <div className="results-container">
          <ListeDemande demandes={demandePrincipale} titre="Résultat Principal : Demande ciblée" />

          {demandesAssociees.length > 0 && (
            <div className="mt-4">
              <hr className="my-hr" />
              <ListeDemande demandes={demandesAssociees} titre="Autres demandes associées au demandeur" />
            </div>
          )}
        </div>
      )}

      {/* Recherche par passeport */}
      {mode === "passeport" && demandePrincipale.length > 0 && (
        <div className="results-container">
          <ListeDemande demandes={demandePrincipale} titre="Demandes liées au passeport" />
        </div>
      )}
    </div>
  );  
}

export default RechercheDemandeApp;