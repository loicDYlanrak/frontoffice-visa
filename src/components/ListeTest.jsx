import React, { useState, useEffect } from 'react';
import { testService } from '../services/api';

const ListeTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const data = await testService.getAllTests();
      setTests(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des tests');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      fetchTests();
      return;
    }
    try {
      setLoading(true);
      const data = await testService.searchTests(searchKeyword);
      setTests(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce test ?')) {
      try {
        await testService.deleteTest(id);
        fetchTests();
      } catch (err) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) return (
    <div className="loading">
      <div>⏳ Chargement des tests...</div>
    </div>
  );
  
  if (error) return (
    <div className="error">
      <div>❌ {error}</div>
      <button onClick={fetchTests} style={{ marginTop: '1rem' }}>Réessayer</button>
    </div>
  );

  return (
    <div className="liste-test">
      <h2>
        📋 Gestion des Tests
        <span style={{ fontSize: '0.9rem', color: '#1F3A40', marginLeft: '1rem' }}>
          {tests.length} test(s) trouvé(s)
        </span>
      </h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Rechercher par nom de test..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button type="submit">🔍 Rechercher</button>
        <button type="button" onClick={fetchTests}>Afficher tout</button>
      </form>

      <table className="test-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du test</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                📭 Aucun test trouvé
              </td>
            </tr>
          ) : (
            tests.map((test) => (
              <tr key={test.id}>
                <td>#{test.id}</td>
                <td><strong>{test.name}</strong></td>
                <td>{test.description || '—'}</td>
                <td>
                  <span className={`status status-${test.status === 1 ? 'active' : 'inactive'}`}>
                    {test.status === 1 ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>{new Date(test.createdAt).toLocaleDateString('fr-FR')}</td>
                <td>
                  <button className="btn-edit" title="Modifier">✏️ Modifier</button>
                  <button className="btn-delete" title="Supprimer" onClick={() => handleDelete(test.id)}>
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListeTest;