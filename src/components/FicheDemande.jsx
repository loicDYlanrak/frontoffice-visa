import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function FicheDemande() {
  const { id } = useParams();
  const [demande, setDemande] = useState(null);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/demandesRecherche?numeroDemande=${id}`)
      .then(res => setDemande(res.data[0]))
      .catch(() => setErreur("Demande introuvable"));
  }, [id]);

  if (erreur) return <p style={{ color: "red" }}>{erreur}</p>;
  if (!demande) return <p>⏳ Chargement...</p>;

  return (
    <div>
      <h1>Fiche Demande #{demande.id}</h1>
      <p><strong>Demandeur :</strong> {demande.demandeur?.nom} {demande.demandeur?.prenom}</p>
      <p><strong>Date demande :</strong> {demande.dateDemande}</p>
      <p><strong>Type demande :</strong> {demande.typeDemande?.libelle}</p>
      <p><strong>Type visa :</strong> {demande.typeVisa?.libelle}</p>
      <p><strong>Numéro visa :</strong> {demande.visaTransformable?.numeroReference ?? "—"}</p>
      <p><strong>Numéro passeport :</strong> {demande.visaTransformable?.passeport?.numeroPasseport ?? "—"}</p>
    </div>
  );
}

export default FicheDemande;