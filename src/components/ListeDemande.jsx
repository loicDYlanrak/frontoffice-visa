import React from 'react';
// import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

function ListeDemande({ demandes, titre = "Résultats" }) {
  // const navigate = useNavigate();

  return (
    <div className="liste-test">
      <h2>{titre} ({demandes.length} demande{demandes.length > 1 ? "s" : ""} trouvée{demandes.length > 1 ? "s" : ""})</h2>
      <div className="table-responsive">
        <table className="test-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date demande</th>
              <th>Demandeur</th>
              <th>Numéro passeport</th>
              <th>Numéro visa</th>
              <th>Type demande</th>
              <th>Type visa</th>
              <th>QR Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => {
              const visa = demande.visaTransformable;
              const passeport = visa?.passeport;

              return (
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>{new Date(demande.dateDemande).toLocaleDateString()}</td>
                  <td>{demande.demandeur?.nom} {demande.demandeur?.prenom}</td>
                  <td>{passeport?.numeroPasseport ?? "—"}</td>
                  <td>{visa?.numeroReference ?? "—"}</td>
                  <td>{demande.typeDemande?.libelle}</td>
                  <td>{demande.typeVisa?.libelle}</td>
                  <td>
                    {demande.id && (
                      <QRCodeSVG
                        value={`${window.location.origin}/fiche-demande/${demande.id}`}
                        size={64}
                        className="qr-code-img"
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/fiche-demande/${demande.id}`} className="btn-edit">
                      Voir détails
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListeDemande;