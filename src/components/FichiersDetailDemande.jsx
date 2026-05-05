import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailsFichier, API_BASE_URL } from "../services/api";

function FichiersDetailDemande() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fichiers, setFichiers] = useState([]);
  const [erreur, setErreur] = useState("");

  const formatFileName = (path) => {
    if (!path) return "Document";
    const cleanPath = path.replace(/\\/g, '/');
    return cleanPath.substring(cleanPath.lastIndexOf('/') + 1);
  };

  useEffect(() => {
    getDetailsFichier(id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setFichiers(data);
      })
      .catch(() => setErreur("Erreur lors du chargement des fichiers. (Erreur 500)"));
  }, [id]);

  return (
    <div className="liste-test">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="my-0">Détail des fichiers — Demande #{id}</h1>
        <button className="btn-submit" onClick={() => navigate(`/fiche-demande/${id}`)}>← Retour</button>
      </div>

      {erreur && <div className="error">{erreur}</div>}

      {fichiers.length === 0 && !erreur ? (
        <p className="text-muted mt-4">Aucun fichier disponible</p>
      ) : (
        <div className="file-preview-list">
          {fichiers.map((f, i) => (
            <div key={i} className="fiche-section">
              <h2 className="my-0 mb-4">{f.pieceRequise?.libelle ?? formatFileName(f.cheminFichier)}</h2>
              
              <div className="fichier-preview-container" style={{ textAlign: 'center', background: '#fcfcfc', border: '1px dashed #ddd', borderRadius: '8px', padding: '1rem' }}>
                {f.base64 ? (
                  f.cheminFichier?.toLowerCase().endsWith(".pdf") ? (
                    <embed
                      src={`data:application/pdf;base64,${f.base64}`}
                      width="100%"
                      height="500px"
                      type="application/pdf"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <img 
                      src={`data:image/jpeg;base64,${f.base64}`} 
                      alt={f.pieceRequise?.libelle ?? "Fichier"}
                      style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px" }}
                    />
                  )
                ) : f.cheminFichier ? (
                  f.cheminFichier.toLowerCase().endsWith(".pdf") ? (
                    <embed
                      src={`${API_BASE_URL}/${f.cheminFichier.replace(/\\/g, '/')}`}
                      width="100%"
                      height="500px"
                      type="application/pdf"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <img 
                      src={`${API_BASE_URL}/${f.cheminFichier.replace(/\\/g, '/')}`} 
                      alt={f.pieceRequise?.libelle ?? "Fichier"}
                      style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px" }}
                    />
                  )
                ) : f.urlFichier ? (
                  <a href={f.urlFichier} target="_blank" rel="noreferrer" className="btn-edit" style={{ display: 'inline-block' }}>
                    Voir le fichier complet en ligne ↗
                  </a>
                ) : (
                  <p className="text-muted" style={{ fontStyle: "italic", margin: "2rem 0" }}>Aucun aperçu disponible pour ce fichier</p>
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