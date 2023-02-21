import { Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { Métier } from '~/server/metiers/domain/métier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';
import {
	aMetierLaBonneAlternanceApiResponse,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.fixture';
import {
	ApiLaBonneAlternanceMétierRepository,
} from '~/server/metiers/infra/apiLaBonneAlternanceMétier.repository';
import { anAxiosError, anAxiosResponse, anHttpClientService } from '~/server/services/http/httpClientService.fixture';

describe('ApiLaBonneAlternanceMétierRepository', () => {
	describe('getMetierList', () => {
		describe('Quand l‘api renvoie un résultat', () => {
			it('retourne un tableau de métier', async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockResolvedValue(anAxiosResponse(aMetierLaBonneAlternanceApiResponse()));
				const expected = aListeDeMetierLaBonneAlternance();
				const repository = new ApiLaBonneAlternanceMétierRepository(httpClientService);

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('success');
				expect((response as Success<Array<Métier>>).result).toEqual(expected);
			});
		});

		describe('Quand l‘api renvoie une erreur', () => {
			it("retourne une instance d'erreur", async () => {
				const httpClientService = anHttpClientService();
				(httpClientService.get as jest.Mock).mockRejectedValue(anAxiosError({ status: 429 }));
				const repository = new ApiLaBonneAlternanceMétierRepository(httpClientService);

				const response = await repository.getMetierList('tran');

				expect(httpClientService.get).toHaveBeenCalledTimes(1);
				expect(response.instance).toEqual('failure');
				expect((response as Failure).errorType).toEqual(ErreurMétier.DEMANDE_INCORRECTE);
			});
		});
	});
});
