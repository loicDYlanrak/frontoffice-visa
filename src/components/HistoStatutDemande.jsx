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
    <div className="liste-test">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="my-0">Historique des statuts — Demande #{id}</h1>
        <button className="btn-submit" onClick={() => navigate(`/fiche-demande/${id}`)}>← Retour</button>
      </div>

      {erreur && <div className="error">{erreur}</div>}

      {statuts.length === 0 ? (
        <p className="text-muted">Aucun statut disponible</p>
      ) : (
        <div className="table-responsive">
          <table className="test-table">
            <thead>
              <tr>
                <th>Statut</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[...statuts].reverse().map((s, i) => (
                <tr key={i}>
                  <td>
                    <span className="status status-active">
                      {s.libelleStatut}
                    </span>
                  </td>
                  <td>{new Date(s.dateChangementStatut).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HistoStatutDemande;