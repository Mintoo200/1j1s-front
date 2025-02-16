import React, { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheOffreEmploi,
} from '~/client/components/features/OffreEmploi/FormulaireRecherche/FormulaireRechercheOffreEmploi';
import {
	EtiquettesFiltreOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/EtiquettesFiltreOffreEmploi';
import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { LaBonneBoitePartner } from '~/client/components/features/ServiceCard/LaBonneBoitePartner';
import { OnisepMetierPartner } from '~/client/components/features/ServiceCard/OnisepMetierPartner';
import { ServiceCiviquePartner } from '~/client/components/features/ServiceCard/ServiceCiviquePartner';
import { Head } from '~/client/components/head/Head';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { EnTete } from '~/client/components/ui/EnTete/EnTete';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { OffreService } from '~/client/services/offre/offre.service';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { MAX_PAGE_ALLOWED_BY_POLE_EMPLOI, NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';

const PREFIX_TITRE_PAGE = 'Rechercher un emploi';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherOffreEmploi() {
	const offreQuery = useOffreQuery();
	const offreService = useDependency<OffreService>('offreService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [offreEmploiList, setOffreEmploiList] = useState<Offre[]>([]);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(function fetchOffres() {
		if (empty(offreQuery)) { return; }
		
		setIsLoading(true);
		setErreurRecherche(undefined);
		offreService.rechercherOffreEmploi(offreQuery)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
					setOffreEmploiList(response.result.résultats);
					setNombreRésultats(response.result.nombreRésultats);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [offreQuery, offreService]);

	const messageRésultatRecherche: string = useMemo(() => {
		const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
		if (nombreRésultats > 1) {
			messageRésultatRechercheSplit.push('offres d‘emplois');
		} else {
			messageRésultatRechercheSplit.push('offre d‘emploi');
		}
		if (offreQuery.motCle) {
			messageRésultatRechercheSplit.push(`pour ${offreQuery.motCle}`);
		}
		return messageRésultatRechercheSplit.join(' ');
	}, [nombreRésultats, offreQuery.motCle]);

	return (
		<>
			<Head
				title={title}
				description="Plus de 400 000 offres d‘emplois et d‘alternances sélectionnées pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BannièreOffreEmploi/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={<EtiquettesFiltreOffreEmploi/>}
					formulaireRecherche={<FormulaireRechercheOffreEmploi/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageRésultatRecherche}
					nombreSolutions={nombreRésultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE_ALLOWED_BY_POLE_EMPLOI - 1}
					listeSolutionElement={<ListeOffreEmploi résultatList={offreEmploiList}/>}
				/>
				<EnTete heading="Découvrez des services faits pour vous"/>
				<ServiceCardList>
					<LaBonneBoitePartner/>
					<OnisepMetierPartner/>
					<ServiceCiviquePartner/>
				</ServiceCardList>
			</main>
		</>
	);
}

interface ListeRésultatProps {
	résultatList: Offre[]
}

function ListeOffreEmploi({ résultatList }: ListeRésultatProps) {
	if (!résultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Offres d‘emplois">
			{résultatList.map((offreEmploi: Offre) => (
				<li key={offreEmploi.id}>
					<RésultatRechercherSolution
						étiquetteOffreList={offreEmploi.étiquetteList}
						intituléOffre={offreEmploi.intitulé}
						lienOffre={`/emplois/${offreEmploi.id}`}
						logo={offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI}
						sousTitreOffre={offreEmploi.entreprise.nom}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function BannièreOffreEmploi() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Des milliers d‘offres d‘emplois</LightHeroPrimaryText>
				<LightHeroSecondaryText>sélectionnées pour vous par Pôle Emploi</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
