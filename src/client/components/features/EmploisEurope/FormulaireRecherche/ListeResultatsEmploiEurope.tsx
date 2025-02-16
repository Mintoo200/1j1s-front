import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

interface ListeResultatsEmploiEuropeProps {
	resultatList: EmploiEurope[];
}

export function ListeResultatsEmploiEurope({ resultatList }: ListeResultatsEmploiEuropeProps) {
	if (!resultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={'Offres d’emplois en Europe'}
		>
			{resultatList.map((emploiEurope) => {
				if (!emploiEurope.id || !emploiEurope.titre) {
					return null;
				}
				return (
					<li key={emploiEurope.id}>
						<RésultatRechercherSolution
							intituléOffre={emploiEurope.titre}
							sousTitreOffre={emploiEurope.nomEntreprise}
							étiquetteOffreList={emploiEurope.tags}
						/>
					</li>
				);
			})}
		</ListeRésultatsRechercherSolution>
	);
}
