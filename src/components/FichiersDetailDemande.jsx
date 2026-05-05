import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailsFichier, API_BASE_URL } from "../services/api";

function FichiersDetailDemande() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fichiers, setFichiers] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getDetailsFichier(id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setFichiers(data);
      })
      .catch(() => setErreur("Erreur lors du chargement des fichiers. (Erreur 500)"));
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Détail des fichiers — Demande #{id}</h1>
      <button onClick={() => navigate(`/fiche-demande/${id}`)}>← Retour</button>

      {erreur && <p style={{ color: "red", marginTop: "1rem" }}>{erreur}</p>}

      {fichiers.length === 0 && !erreur ? (
        <p style={{ marginTop: "1rem" }}>Aucun fichier disponible</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
          {fichiers.map((f, i) => (
            <div key={i} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", background: "white" }}>
              <h3>{f.pieceRequise?.libelle ?? f.cheminFichier ?? "Document"}</h3>
              
              <div style={{ marginTop: "10px" }}>
                {f.base64 ? (
                  f.cheminFichier?.toLowerCase().endsWith(".pdf") ? (
                    <embed
                      src={`data:application/pdf;base64,${f.base64}`}
                      width="100%"
                      height="500px"
                      type="application/pdf"
                    />
                  ) : (
                    <img 
                      src={`data:image/jpeg;base64,${f.base64}`} 
                      alt={f.pieceRequise?.libelle ?? "Fichier"}
                      style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", border: "1px solid #eee" }}
                    />
                  )
                ) : f.cheminFichier ? (
                  f.cheminFichier.toLowerCase().endsWith(".pdf") ? (
                    <embed
                      src={`${API_BASE_URL}/${f.cheminFichier.replace(/\\/g, '/')}`}
                      width="100%"
                      height="500px"
                      type="application/pdf"
                    />
                  ) : (
                    <img 
                      src={`${API_BASE_URL}/${f.cheminFichier.replace(/\\/g, '/')}`} 
                      alt={f.pieceRequise?.libelle ?? "Fichier"}
                      style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain", border: "1px solid #eee" }}
                    />
                  )
                ) : f.urlFichier ? (
                  <a href={f.urlFichier} target="_blank" rel="noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
                    Voir le fichier en ligne
                  </a>
                ) : (
                  <p style={{ fontStyle: "italic", color: "#666" }}>Aucun aperçu disponible</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FichiersDetailDemande;