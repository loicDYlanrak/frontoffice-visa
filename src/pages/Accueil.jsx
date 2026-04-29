import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Accueil = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    activeTests: 0,
    recentTests: 0
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalTests: 156,
        activeTests: 128,
        recentTests: 8
      });
    }, 500);
  }, []);

  const activities = [
    { id: 1, text: 'Test "API Gateway" ajouté par Thomas', time: 'Il y a 2 heures' },
    { id: 2, text: 'Mise à jour du test "Security Check"', time: 'Il y a 5 heures' },
    { id: 3, text: 'Suppression du test "Legacy System"', time: 'Hier' },
    { id: 4, text: 'Nouveau test "Performance Audit" créé', time: 'Hier' }
  ];

  return (
    <div className="accueil">
      <div className="welcome-section">
        <h1>Bienvenue sur VisaFlow</h1>
        <p>Gérez efficacement toutes vos demandes de visas et tests en un seul endroit</p>
      </div>

      <div className="stats-cards">
        <div className="card">
          <div className="card-icon">📊</div>
          <h3>Statistiques Globales</h3>
          <p><strong>{stats.totalTests}</strong> tests au total</p>
          <p><strong>{stats.activeTests}</strong> tests actifs</p>
          <p><strong>{stats.totalTests - stats.activeTests}</strong> tests inactifs</p>
        </div>

        <div className="card">
          <div className="card-icon">✅</div>
          <h3>Activité Récente</h3>
          <p><strong>{stats.recentTests}</strong> nouveaux tests cette semaine</p>
          <p>Taux d'activité: {Math.round((stats.activeTests / stats.totalTests) * 100)}%</p>
          <Link to="/tests">Voir tous les tests →</Link>
        </div>

        <div className="card">
          <div className="card-icon">⚡</div>
          <h3>Actions Rapides</h3>
          <Link to="/tests/create">+ Créer un test</Link>
          <Link to="/tests">📋 Gérer les tests</Link>
        </div>
      </div>

      <div className="recent-activities">
        <h2>Activités Récentes</h2>
        <ul>
          {activities.map(activity => (
            <li key={activity.id}>
              <div>
                <strong>{activity.text}</strong>
                <small style={{ display: 'block', color: '#666', fontSize: '0.8rem' }}>
                  {activity.time}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accueil;