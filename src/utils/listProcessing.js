export const separerDemandePrincipaleEtAssociees = (demandes) => {
    if (!Array.isArray(demandes) || demandes.length === 0) {
        return { principale: [], associees: [] };
    }
    const [premiere, ...reste] = demandes;
    return {
        principale: [premiere],
        associees: reste
    };
};

export const trierDemandesChronologique = (demandes) => {
    if (!Array.isArray(demandes)) return [];
    return [...demandes].sort((a, b) => 
        new Date(a.dateDemande) - new Date(b.dateDemande)
    );
};