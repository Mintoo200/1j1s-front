import { CmsRepository } from '~/server/cms/domain/cms.repository';

import { StrapiRepository } from './strapi.repository';

export function aStrapiCmsRepository(override?: Partial<StrapiRepository>): CmsRepository {
	return {
		getActualitéList: jest.fn(),
		getAllFAQ: jest.fn(),
		getAllVideosCampagneApprentissage: jest.fn(),
		getAnnonceDeLogementBySlug: jest.fn(),
		getArticleBySlug: jest.fn(),
		getCollectionType: jest.fn(),
		getCollectionTypeDeprecated: jest.fn(),
		getFAQBySlug: jest.fn(),
		getFirstFromCollectionType: jest.fn(),
		getMentionObligatoire: jest.fn(),
		getMesuresEmployeurs: jest.fn(),
		getOffreDeStageBySlug: jest.fn(),
		getServiceJeuneList: jest.fn(),
		listAllAnnonceDeLogementSlug: jest.fn(),
		listAllArticleSlug: jest.fn(),
		listAllFAQSlug: jest.fn(),
		listAllOffreDeStageSlug: jest.fn(),
		save: jest.fn(),
		saveOffreDeStage: jest.fn(),
		...override,
	};
}
