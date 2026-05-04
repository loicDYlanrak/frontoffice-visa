import { useState } from "react";
import { rechercherParNumeroDemande, rechercherParPasseport } from "../services/api";
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

        const [premiere, ...reste] = res.data;
        setDemandePrincipale(premiere ? [premiere] : []);
        setDemandesAssociees(reste);
        console.log("Données reçues :", res.data);

      } else {
        setMode("passeport");
        res = await rechercherParPasseport(numeroPasseport);

        const triees = res.data.sort((a, b) =>
          new Date(a.dateDemande) - new Date(b.dateDemande)
        );
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
    <div>
      <h1>Recherche de demande</h1>

      <input
        value={numeroDemande}
        onChange={(e) => setNumeroDemande(e.target.value)}
        placeholder="Numéro de demande"
      />
      <input
        value={numeroPasseport}
        onChange={(e) => setNumeroPasseport(e.target.value)}
        placeholder="Numéro de passeport"
      />
      <button onClick={handleRecherche}>Rechercher</button>

      {loading && <p>⏳ Chargement...</p>}
      {erreur   && <p style={{ color: "red" }}>{erreur}</p>}

      {/* Recherche par numéro demande */}
      {mode === "demande" && demandePrincipale.length > 0 && (
        <>
          <ListeDemande demandes={demandePrincipale} titre="Demande" />

          {demandesAssociees.length > 0 && (
            <>
              <hr />
              <ListeDemande demandes={demandesAssociees} titre="Demandes associées" />
            </>
            
          )}
        </>
      )}

      {/* Recherche par passeport */}
      {mode === "passeport" && demandePrincipale.length > 0 && (
        <ListeDemande demandes={demandePrincipale} titre="Demandes liées au passeport" />
      )}
    </div>
  );  
}

export default RechercheDemandeApp;