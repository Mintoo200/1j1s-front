import {
	ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
	aRésultatsRéférentielCommunesResponseList,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository.fixture';
import { CacheService } from '~/server/services/cache/cache.service';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import {
	anAuthenticatedHttpClientService,
	anAxiosResponse,
} from '~/server/services/http/publicHttpClient.service.fixture';

jest.mock('axios', () => {
	return {
		isAxiosError: jest.fn().mockReturnValue(true),
	};
});

describe('ApiPoleEmploiRéférentielRepository', () => {
	let httpClientServiceWithAuthentification: AuthenticatedHttpClientService;
	let cacheService: CacheService;
	let apiPoleEmploiRéférentielRepository: ApiPoleEmploiRéférentielRepository;

	beforeEach(() => {
		httpClientServiceWithAuthentification = anAuthenticatedHttpClientService();
		cacheService = new NullCacheService();
		apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(httpClientServiceWithAuthentification, cacheService);
	});

	describe('findCodeInseeInRéférentielCommune', () => {
		describe('quand le code insee est trouvé', () => {
			it('retourne le code insee', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRéférentielCommunesResponseList()));
				const expected = '55000';

				const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('55000');

				expect(result).toEqual(expected);
			});
		});

		describe('quand le code insee n‘est trouvé', () => {
			it('retourne le code passé en paramètre', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRéférentielCommunesResponseList()));
				const expected = '75999';

				const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('75999');

				expect(result).toEqual(expected);
			});
		});
		describe('quand le code insee est celui de Paris', () => {
			it('retourne le code insee de paris 01', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRéférentielCommunesResponseList()));
				const expected = '75101';

				const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('75056');

				expect(result).toEqual(expected);
			});
		});

		describe('quand le code insee est celui de Marseille', () => {
			it('retourne le code insee de marseille 01', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRéférentielCommunesResponseList()));
				const expected = '13201';

				const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('13055');

				expect(result).toEqual(expected);
			});
		});

		describe('quand le code insee est celui de Lyon', () => {
			it('retourne le code insee de Lyon 01', async () => {
				jest
					.spyOn(httpClientServiceWithAuthentification, 'get')
					.mockResolvedValue(anAxiosResponse(aRésultatsRéférentielCommunesResponseList()));
				const expected = '69381';

				const result = await apiPoleEmploiRéférentielRepository.findCodeInseeInRéférentielCommune('69123');

				expect(result).toEqual(expected);
			});
		});
	});
});
