import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { getDemandeDetails, getHistoStatut, getDetailsFichier } from "../services/api";

function FicheDemande() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [statuts, setStatuts] = useState([]);
  const [fichiers, setFichiers] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    getDemandeDetails(id)
      .then(res => setData(res.data))
      .catch(() => setErreur("Demande introuvable"));

    getHistoStatut(id)
      .then(res => setStatuts(res.data))
      .catch(() => setStatuts([]));

    getDetailsFichier(id)
      .then(res => setFichiers(res.data))
      .catch(() => setFichiers([]));
  }, [id]);

  if (erreur) return <div className="error">{erreur}</div>;
  if (!data) return <div className="loading">⏳ Chargement de la fiche de la demande...</div>;

  const derniers3Statuts = statuts.slice(-3).reverse();

  return (
    <div className="liste-test">
      <div className="fiche-header">
        <h1 className="my-0">Fiche de Demande <span style={{ color: "#F2B544" }}>#{id}</span></h1>
        <button className="btn-submit" onClick={() => navigate("/recherche")}>
          Nouvelle recherche
        </button>
      </div>

      <div className="grid-cards">
        {/* QR Code */}
        <section className="fiche-section" style={{ textAlign: 'center' }}>
          <h2>Scanner pour suivi</h2>
          <QRCodeSVG
            value={`${window.location.origin}/fiche-demande/${id}`}
            size={160}
            className="qr-code-img"
            style={{ margin: "1rem auto" }}
          />
        </section>

        {/* État civil */}
        <section className="fiche-section">
          <h2>État Civil</h2>
          <div className="fiche-item">
            <span className="fiche-label">Nom</span>
            <span className="fiche-value">{data.EtatCivil?.nom} {data.EtatCivil?.prenom}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Date de naissance</span>
            <span className="fiche-value">{data.EtatCivil?.dateNaissance}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Lieu de naissance</span>
            <span className="fiche-value">{data.EtatCivil?.lieuNaissance}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Nationalité</span>
            <span className="fiche-value">{data.EtatCivil?.nationalite?.libelle}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Situation familiale</span>
            <span className="fiche-value">{data.EtatCivil?.situationFamiliale?.libelle}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Téléphone</span>
            <span className="fiche-value">{data.EtatCivil?.telephone}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Email</span>
            <span className="fiche-value">{data.EtatCivil?.email}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Adresse</span>
            <span className="fiche-value">{data.EtatCivil?.adresse}</span>
          </div>
        </section>

        {/* Passeport */}
        <section className="fiche-section">
          <h2>Passeport</h2>
          <div className="fiche-item">
            <span className="fiche-label">Numéro</span>
            <span className="fiche-value">{data.passeport?.numeroPasseport ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Date de délivrance</span>
            <span className="fiche-value">{data.passeport?.dateDelivrance ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Date d'expiration</span>
            <span className="fiche-value">{data.passeport?.dateExpiration ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Pays de délivrance</span>
            <span className="fiche-value">{data.passeport?.paysDelivrance ?? "—"}</span>
          </div>
        </section>

        {/* Visa transformable */}
        <section className="fiche-section">
          <h2>Visa Transformable</h2>
          <div className="fiche-item">
            <span className="fiche-label">Référence</span>
            <span className="fiche-value">{data.visaTransformable?.numeroReference ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Date d'entrée</span>
            <span className="fiche-value">{data.visaTransformable?.dateEntree ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Date de sortie</span>
            <span className="fiche-value">{data.visaTransformable?.dateSortie ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Type visa</span>
            <span className="fiche-value">{data.typeVisa?.libelle ?? "—"}</span>
          </div>
          <div className="fiche-item">
            <span className="fiche-label">Type demande</span>
            <span className="fiche-value">{data.typeDemande?.libelle ?? "—"}</span>
          </div>
        </section>
      </div>

      <div className="grid-cards">
        {/* Historique statuts */}
        <section className="fiche-section" style={{ gridColumn: 'span 2' }}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="my-0 border-0">Historique de statut</h2>
            <button className="btn-edit" onClick={() => navigate(`/histo-statut/${id}`)}>
              Voir historique complet
            </button>
          </div>
          {derniers3Statuts.length === 0 ? (
            <p className="text-muted">Aucun statut disponible</p>
          ) : (
            <div className="table-responsive">
              <table className="test-table">
                <thead>
                  <tr>
                    <th>Statut</th>
                    <th>Date d'affectation</th>
                  </tr>
                </thead>
                <tbody>
                  {derniers3Statuts.map((s, i) => (
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
        </section>

        {/* Fichiers */}
        <section className="fiche-section" style={{ gridColumn: 'span 2' }}>
           <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="my-0 border-0">Pièces Justificatives</h2>
            <button className="btn-submit" onClick={() => navigate(`/fichiers-detail/${id}`)}>
              Voir détail uploads
            </button>
          </div>
          {fichiers.length === 0 ? (
            <p className="text-muted">Aucun fichier uploadé</p>
          ) : (
            <div className="table-responsive">
              <table className="test-table">
                <thead>
                  <tr>
                    <th>Document Requis</th>
                    <th>Statut Upload</th>
                  </tr>
                </thead>
                <tbody>
                  {fichiers.map((f, i) => (
                    <tr key={i}>
                      <td>{f.pieceRequise?.libelle ?? f.cheminFichier}</td>
                      <td>
                        <span className="status status-active" style={{ backgroundColor: "#10b981" }}> ✓ Fourni </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Reste Conditionnel (Visa / Carte résident) */}
      {(data.visa || data.carteResident) && (
        <div className="grid-cards">
          {data.visa && (
            <section className="fiche-section">
              <h2>Visa Délivré</h2>
              <div className="fiche-item">
                <span className="fiche-label">Référence</span>
                <span className="fiche-value">{data.visa?.reference}</span>
              </div>
              <div className="fiche-item">
                <span className="fiche-label">Date début</span>
                <span className="fiche-value">{data.visa?.dateDebut}</span>
              </div>
              <div className="fiche-item">
                <span className="fiche-label">Date fin</span>
                <span className="fiche-value">{data.visa?.dateFin}</span>
              </div>
            </section>
          )}
          {data.carteResident && (
            <section className="fiche-section">
              <h2>Carte de Résidence</h2>
              <div className="fiche-item">
                <span className="fiche-label">Référence</span>
                <span className="fiche-value">{data.carteResident?.reference}</span>
              </div>
            </section>
          )}
        </div>
      )}

    </div>
  );
}

export default FicheDemande;