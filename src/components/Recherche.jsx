import { useState } from "react";
import {
  rechercherParNumeroDemande,
  rechercherParPasseport
} from "../services/api";

function RechercheDemandeApp() {
  const [numeroDemande, setNumeroDemande] = useState("");
  const [numeroPasseport, setNumeroPasseport] = useState("");
  const [demandes, setDemandes]   = useState([]);
  const [erreur, setErreur]       = useState("");
  const [loading, setLoading]     = useState(false);
  const [rechercheFaite, setRechercheFaite] = useState(false); // ← nouveau

  const handleRecherche = async () => {
    setRechercheFaite(true);
    setErreur("");
    setDemandes([]);

    // Si les deux sont vides → afficher "Aucune demande trouvée"
    if (!numeroDemande && !numeroPasseport) {
      setErreur("Aucune demande trouvée");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (numeroDemande) {
        res = await rechercherParNumeroDemande(numeroDemande);
      } else {
        res = await rechercherParPasseport(numeroPasseport);
      }

      if (res.data && res.data.length > 0) {
        setDemandes(res.data);
      } else {
        setErreur("Aucune demande trouvée");
      }

    } catch (err) {
      if (err.response?.status === 404) {
        setErreur("Aucune demande trouvée");
      } else if (err.response?.status === 400) {
        setErreur("Aucune demande trouvée");
      } else {
        setErreur("❌ Erreur serveur.");
      }
      setDemandes([]);
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

      {/* Message erreur ou aucun résultat */}
      {!loading && erreur && (
        <p style={{ color: "red" }}>{erreur}</p>
      )}

      {/* Liste des demandes trouvées */}
      {!loading && demandes.length > 0 && (
        <ul>
          {demandes.map((demande) => (
            <li key={demande.id}>
              Demande #{demande.id} — {demande.demandeur?.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RechercheDemandeApp;