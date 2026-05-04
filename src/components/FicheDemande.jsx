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

  if (erreur) return <p style={{ color: "red" }}>{erreur}</p>;
  if (!data) return <p>⏳ Chargement...</p>;

  const derniers3Statuts = statuts.slice(-3).reverse();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fiche Demande #{id}</h1>

      {/* QR Code */}
      <section>
        <h2>QR Code</h2>
        <QRCodeSVG
          value={`${window.location.origin}/fiche-demande/${id}`}
          size={128}
        />
      </section>

      {/* État civil */}
      <section>
        <h2>État Civil</h2>
        <p><strong>Nom :</strong> {data.EtatCivil?.nom} {data.EtatCivil?.prenom}</p>
        <p><strong>Date de naissance :</strong> {data.EtatCivil?.dateNaissance}</p>
        <p><strong>Lieu de naissance :</strong> {data.EtatCivil?.lieuNaissance}</p>
        <p><strong>Nationalité :</strong> {data.EtatCivil?.nationalite?.libelle}</p>
        <p><strong>Situation familiale :</strong> {data.EtatCivil?.situationFamiliale?.libelle}</p>
        <p><strong>Téléphone :</strong> {data.EtatCivil?.telephone}</p>
        <p><strong>Email :</strong> {data.EtatCivil?.email}</p>
        <p><strong>Adresse :</strong> {data.EtatCivil?.adresse}</p>
      </section>

      {/* Passeport */}
      <section>
        <h2>Passeport</h2>
        <p><strong>Numéro :</strong> {data.passeport?.numeroPasseport ?? "—"}</p>
        <p><strong>Date de délivrance :</strong> {data.passeport?.dateDelivrance ?? "—"}</p>
        <p><strong>Date d'expiration :</strong> {data.passeport?.dateExpiration ?? "—"}</p>
        <p><strong>Pays de délivrance :</strong> {data.passeport?.paysDelivrance ?? "—"}</p>
      </section>

      {/* Visa transformable */}
      <section>
        <h2>Visa Transformable</h2>
        <p><strong>Référence :</strong> {data.visaTransformable?.numeroReference ?? "—"}</p>
        <p><strong>Date d'entrée :</strong> {data.visaTransformable?.dateEntree ?? "—"}</p>
        <p><strong>Date de sortie :</strong> {data.visaTransformable?.dateSortie ?? "—"}</p>
        <p><strong>Type visa :</strong> {data.typeVisa?.libelle ?? "—"}</p>
        <p><strong>Type demande :</strong> {data.typeDemande?.libelle ?? "—"}</p>
      </section>

      {/* Statut actuel */}
      <section>
        <h2>Statut actuel</h2>
        <p><strong>{data.Status ?? "—"}</strong></p>
      </section>

      {/* Visa et carte de résidence si approuvé */}
      {data.visa && (
        <section>
          <h2>Visa</h2>
          <p><strong>Référence :</strong> {data.visa?.reference}</p>
          <p><strong>Date début :</strong> {data.visa?.dateDebut}</p>
          <p><strong>Date fin :</strong> {data.visa?.dateFin}</p>
        </section>
      )}
      {data.carteResident && (
        <section>
          <h2>Carte de Résidence</h2>
          <p><strong>Référence :</strong> {data.carteResident?.reference}</p>
        </section>
      )}

      {/* Historique statuts */}
      <section>
        <h2>Historique de statut</h2>
        {derniers3Statuts.length === 0 ? (
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
              {derniers3Statuts.map((s, i) => (
                <tr key={i}>
                  <td>{s.libelleStatut}</td>
                  <td>{s.dateChangementStatut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={() => navigate(`/histo-statut/${id}`)}>Voir plus</button>
      </section>

      {/* Fichiers */}
      <section>
        <h2>Fichiers</h2>
        {fichiers.length === 0 ? (
          <p>Aucun fichier uploadé</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Document</th>
                <th>Uploadé</th>
              </tr>
            </thead>
            <tbody>
              {fichiers.map((f, i) => (
                <tr key={i}>
                  <td>{f.pieceRequise?.libelle ?? f.cheminFichier}</td>
                  <td>
                    <input type="checkbox" checked={true} readOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={() => navigate(`/fichiers-detail/${id}`)}>Voir détail upload</button>
      </section>
    </div>
  );
}

export default FicheDemande;