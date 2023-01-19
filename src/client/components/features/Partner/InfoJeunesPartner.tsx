import React from 'react';

import { PartnerCard } from './Card/PartnerCard';

export function InfoJeunesPartner() {
	return (
		<PartnerCard
			linkLabel="En savoir plus"
			link="/articles/info-jeunes"
			logo="/images/logos/info-jeunes.svg"
			title="Info Jeunes, le réseau d’accueil et d’information des jeunes en France au service d’une ambition : explorer les possibles !"
		>
			La structure Info Jeunes (SIJ) accueille tous les jeunes (de 12 à 30 ans)
			anonymement et gratuitement. On vous aide à trouver des informations et on
			vous accompagne sur des sujets comme : scolarité, formation, emploi,
			logement, loisirs, départ vers l’étranger, aides pour un projet...
		</PartnerCard>
	);
}
