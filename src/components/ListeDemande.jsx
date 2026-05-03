import React from 'react';

const ListeDemande = ({ demandes }) => {
  if (!demandes || demandes.length === 0) {
    return (
      <div className="liste-demande">
        <div className="empty-state">
          <p>📭 Aucune demande à afficher</p>
        </div>
      </div>
    );
  }

  return (
    <div className="liste-demande">
      <div className="results-header">
        <h2> Résultats de Recherche</h2>
        <span className="result-count">{demandes.length} demande(s) trouvée(s)</span>
      </div>

      <table className="demandes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Numéro Demande</th>
            <th>Numéro Passeport</th>
            <th>Statut</th>
            <th>Date de Création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>#{demande.id}</td>
              <td><strong>{demande.name || demande.numeroDemande || '—'}</strong></td>
              <td>{demande.description || demande.numeroPasseport || '—'}</td>
              <td>
                <span className={`status status-${demande.status === 1 ? 'active' : 'inactive'}`}>
                  {demande.status === 1 ? ' Actif' : ' Inactif'}
                </span>
              </td>
              <td>
                {demande.createdAt 
                  ? new Date(demande.createdAt).toLocaleDateString('fr-FR') 
                  : '—'
                }
              </td>
              <td>
                <button className="btn-view" title="Détails">👁️ Voir</button>
                <button className="btn-edit" title="Modifier">✏️ Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeDemande;
