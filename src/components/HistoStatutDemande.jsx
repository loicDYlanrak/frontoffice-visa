import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getHistoStatut } from "../services/api";

function HistoStatutDemande() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statuts, setStatuts] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getHistoStatut(id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setStatuts(data);
      })
      .catch(() => setErreur("Historique introuvable"));
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Historique des statuts — Demande #{id}</h1>
      <button onClick={() => navigate(`/fiche-demande/${id}`)}>← Retour</button>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}

      {statuts.length === 0 ? (
        <p>Aucun statut disponible</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...statuts].reverse().map((s, i) => (
              <tr key={i}>
                <td>{s.libelleStatut}</td>
                <td>{s.dateChangementStatut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoStatutDemande;