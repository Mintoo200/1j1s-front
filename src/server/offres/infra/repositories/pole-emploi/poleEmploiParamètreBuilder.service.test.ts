import { anOffreÉchantillonAvecLocalisationEtMotCléFiltre } from '~/server/offres/domain/offre.fixture';
import {
	aApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository.fixture';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';

describe('poleEmploiParamètreBuilder.service', () => {
	const apiPoleEmploiRéférentielRepositoryMock = aApiPoleEmploiRéférentielRepository();

	describe('buildCommonParamètresRecherche', () => {
		it('retourne les paramètres communs au recherche de l’api pole emploi', async () => {
			jest
				.spyOn(apiPoleEmploiRéférentielRepositoryMock, 'findCodeInseeInRéférentielCommune')
				.mockResolvedValue('75101');

			const result = await new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepositoryMock).buildCommonParamètresRecherche(anOffreÉchantillonAvecLocalisationEtMotCléFiltre());

			expect(result).toEqual('commune=75101&motsCles=boulanger&range=0-14');
		});
	});
});
