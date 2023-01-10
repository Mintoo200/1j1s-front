import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheAlternance,
} from '~/client/components/features/Alternance/FormulaireRecherche/FormulaireRechercheAlternance';
import { PartnerCardList } from '~/client/components/features/Partner/Card/PartnerCard';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { OnisepPartner } from '~/client/components/features/Partner/OnisepPartner';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import {
	RechercherSolutionLayout,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import {
	LightHeroPrimaryText, LightHeroSecondaryText,
	LightHeroTextWrapper,
	LightHeroWrapper,
} from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { OffreService } from '~/client/services/offre/offre.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE, Offre } from '~/server/offres/domain/offre';


const PREFIX_TITRE_PAGE = 'Rechercher une alternance';
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherAlternance() {
	const router = useRouter();
	const offreQuery = useOffreQuery();
	const offreService = useDependency<OffreService>('offreService');

	const MAX_PAGE = 65;

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [alternanceList, setAlternanceList] = useState<Offre[]>([]);
	const [nombreRésultats, setNombreRésultats] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);

	useEffect(() => {
		const queryString = stringify(router.query);

		setIsLoading(true);
		setErreurRecherche(undefined);
		offreService.rechercherAlternance(queryString)
			.then((response) => {
				if (response.instance === 'success') {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
					setAlternanceList(response.result.résultats);
					setNombreRésultats(response.result.nombreRésultats);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [router.query, offreService]);

	const messageRésultatRecherche: string = useMemo(() => {
		const messageRésultatRechercheSplit: string[] = [`${nombreRésultats}`];
		if (nombreRésultats > 1) {
			messageRésultatRechercheSplit.push('offres d’alternances');
		} else {
			messageRésultatRechercheSplit.push('offre d’alternance');
		}
		if (offreQuery.motCle) {
			messageRésultatRechercheSplit.push(`pour ${offreQuery.motCle}`);
		}
		return messageRésultatRechercheSplit.join(' ');
	}, [nombreRésultats, offreQuery.motCle]);

	const étiquettesRecherche = useMemo(() => {
		if (offreQuery.libelleLocalisation) {
			return <TagList list={[offreQuery.libelleLocalisation]} aria-label="Filtres de la recherche"/>;
		} else {
			return undefined;
		}
	}, [offreQuery.libelleLocalisation]);

	return (
		<>
			<HeadTag
				title={title}
				description="Des milliers d’alternances sélectionnées pour vous"
			/>
			<main id="contenu">
				<RechercherSolutionLayout
					bannière={<BannièreAlternance/>}
					erreurRecherche={erreurRecherche}
					étiquettesRecherche={étiquettesRecherche}
					formulaireRecherche={<FormulaireRechercheAlternance/>}
					isLoading={isLoading}
					messageRésultatRecherche={messageRésultatRecherche}
					nombreSolutions={nombreRésultats}
					paginationOffset={NOMBRE_RÉSULTATS_OFFRE_PAR_PAGE}
					maxPage={MAX_PAGE}
					listeSolutionElement={<ListeOffreAlternance résultatList={alternanceList}/>}
				/>
				<PartnerCardList>
					<LaBonneBoitePartner />
					<OnisepPartner />
					<ServiceCiviquePartner />
				</PartnerCardList>
			</main>
		</>
	);
}

interface ListeRésultatProps {
  résultatList: Offre[]
}

function ListeOffreAlternance({ résultatList }: ListeRésultatProps) {
	if (!résultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution aria-label="Offres d’alternances">
			{résultatList.map((offreEmploi: Offre) => (
				<li key={offreEmploi.id}>
					<RésultatRechercherSolution
						étiquetteOffreList={offreEmploi.étiquetteList}
						intituléOffre={offreEmploi.intitulé}
						lienOffre={`/emplois/${offreEmploi.id}`}
						logoEntreprise={offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI}
						nomEntreprise={offreEmploi.entreprise.nom}
					/>
				</li>
			))}
		</ListeRésultatsRechercherSolution>
	);
}

function BannièreAlternance() {
	return (
		<LightHeroWrapper>
			<LightHeroTextWrapper>
				<h1>
					<LightHeroPrimaryText>Des milliers d’alternances</LightHeroPrimaryText>
				</h1>
				<LightHeroSecondaryText>sélectionnés pour vous par Pôle Emploi</LightHeroSecondaryText>
			</LightHeroTextWrapper>
		</LightHeroWrapper>
	);
}
