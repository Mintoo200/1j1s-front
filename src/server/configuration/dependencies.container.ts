import {
	AlternanceDependencies,
	alternancesDependenciesContainer,
} from '~/server/alternances/configuration/dependencies.container';
import {
	getApiLaBonneAlternanceConfig,
} from '~/server/alternances/configuration/la-bonne-alternance/laBonneAlternanceHttpClient.config';
import {
	ApiLaBonneAlternanceRepository,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.repository';
import {
	ApiLaBonneAlternanceErrorManagementServiceGet, ApiLaBonneAlternanceErrorManagementServiceSearch,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternanceErrorManagement.service';
import { CmsDependencies, cmsDependenciesContainer } from '~/server/cms/configuration/dependencies.container';
import { getApiStrapiConfig, getAuthApiStrapiConfig } from '~/server/cms/configuration/strapi/strapiHttpClient.config';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { StrapiErrorManagementService } from '~/server/cms/infra/repositories/strapiErrorManagement.service';
import {
	DemandeDeContactDependencies,
	demandeDeContactDependenciesContainer,
} from '~/server/demande-de-contact/configuration/dependencies.container';
import {
	DemandeDeContactAccompagnementRepository,
} from '~/server/demande-de-contact/infra/repositories/accompagnement/demandeDeContactAccompagnement.repository';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import {
	OffresEmploiDependencies,
	offresEmploiDependenciesContainer,
} from '~/server/emplois/configuration/dependencies.container';
import { ApiPoleEmploiOffreRepository } from '~/server/emplois/infra/repositories/apiPoleEmploiOffre.repository';
import {
	getApiEuresPublicHttpClientConfig,
} from '~/server/emplois-europe/configuration/apiEures/apiEuresPublicHttpClient.config';
import {
	EmploiEuropeDependencies,
	emploiEuropeDependenciesContainer,
} from '~/server/emplois-europe/configuration/dependencies.container';
import { ApiEuresEmploiEuropeMapper } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.mapper';
import { ApiEuresEmploiEuropeRepository } from '~/server/emplois-europe/infra/repositories/apiEuresEmploiEurope.repository';
import { fixtureEmploiEuropeRepository } from '~/server/emplois-europe/infra/repositories/fixtureEmploiEurope.repository';
import {
	getApiEngagementConfig,
} from '~/server/engagement/configuration/api-engagement/apiEngagementHttpClient.config';
import {
	EngagementDependencies,
	engagementDependenciesContainer,
} from '~/server/engagement/configuration/dependencies.container';
import { ApiEngagementRepository } from '~/server/engagement/infra/repositories/apiEngagement.repository';
import {
	EntrepriseDependencies,
	entreprisesDependenciesContainer,
} from '~/server/entreprises/configuration/dependencies.container';
import {
	getApiRejoindreLaMobilisationConfig,
} from '~/server/entreprises/configuration/rejoindre-la-mobilisation/rejoindreLaMobilisationHttpClient.config';
import { ApiRejoindreLaMobilisationRepository } from '~/server/entreprises/infra/apiRejoindreLaMobilisation.repository';
import {
	ApiRejoindreLaMobilisationErrorManagementService,
} from '~/server/entreprises/infra/apiRejoindreLaMobilisationErrorManagement.service';
import {
	ÉtablissementAccompagnementDependencies,
	établissementAccompagnementDependenciesContainer,
} from '~/server/établissement-accompagnement/configuration/dependencies.container';
import {
	getApiÉtablissementsPublicsConfig,
} from '~/server/établissement-accompagnement/configuration/établissements-publics/établissementPublicHttpClient.config';
import {
	ApiÉtablissementPublicRepository,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';
import {
	FicheMetierDependencies,
	ficheMetierDependenciesContainer,
} from '~/server/fiche-metier/configuration/dependencies.container';
import { StrapiFicheMetierRepository } from '~/server/fiche-metier/infra/strapiFicheMetier.repository';
import {
	getApiTrajectoiresProConfig,
} from '~/server/formations/configuration/api-trajectoires-pro/apiTrajectoiresProHttpClient.config';
import {
	FormationDependencies,
	formationsDependenciesContainer,
} from '~/server/formations/configuration/dependencies.container';
import {
	ApiLaBonneAlternanceFormationRepository,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';
import {
	ApiTrajectoiresProStatistiqueRepository,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistique.repository';
import {
	ApiTrajectoiresProStatistiqueErrorManagementService,
} from '~/server/formations/infra/repositories/apiTrajectoiresProStatistiqueErrorManagementService';
import {
	FormationInitialeDependencies,
	formationInitialeDependenciesContainer,
} from '~/server/formations-initiales/configuration/dependencies.container';
import {
	getApiOnisepAuthenticatedConfig,
} from '~/server/formations-initiales/configuration/httpClient/apiOnisepAuthenticatedHttpClient.config';
import {
	getApiOnisepPublicConfig,
} from '~/server/formations-initiales/configuration/httpClient/apiOnisepPublicHttpClient.config';
import {
	OnisepFormationInitialeRepository,
} from '~/server/formations-initiales/infra/onisepFormationInitiale.repository';
import {
	FormationInitialeDetailDependencies,
	formationInitialeDetailDependenciesContainer,
} from '~/server/formations-initiales-detail/configuration/dependencies.container';
import {
	StrapiFormationInitialeDetailRepository,
} from '~/server/formations-initiales-detail/infra/strapiFormationInitialeDetail.repository';
import {
	jobsEteDependenciesContainer,
	OffresJobEteDependencies,
} from '~/server/jobs-ete/configuration/dependencies.container';
import { ApiPoleEmploiJobEteRepository } from '~/server/jobs-ete/infra/repositories/apiPoleEmploiJobEte.repository';
import {
	jobsÉtudiantsDependenciesContainer,
	OffresJobÉtudiantDependencies,
} from '~/server/jobs-étudiants/configuration/dependencies.container';
import {
	ApiPoleEmploiJobÉtudiantRepository,
} from '~/server/jobs-étudiants/infra/repositories/apiPoleEmploiJobÉtudiant.repository';
import { getApiAdresseConfig } from '~/server/localisations/configuration/adresse/adresseHttpClient.config';
import {
	LocalisationDependencies,
	localisationDependenciesContainer,
} from '~/server/localisations/configuration/dependencies.container';
import { getApiGeoGouvConfig } from '~/server/localisations/configuration/geo/geoHttpClient.config';
import { ApiAdresseRepository } from '~/server/localisations/infra/repositories/apiAdresse.repository';
import {
	ApiAdresseErrorManagementService,
} from '~/server/localisations/infra/repositories/apiAdresseErrorManagement.service';
import { ApiGeoRepository } from '~/server/localisations/infra/repositories/apiGeo.repository';
import { ApiGeoErrorManagementService } from '~/server/localisations/infra/repositories/apiGeoErrorManagement.service';
import { getApiTipimailConfig } from '~/server/mail/configuration/tipimail/tipimailHttpClient.config';
import { TipimailRepository } from '~/server/mail/infra/repositories/tipimail.repository';
import {
	MétierDependencies,
	métiersDependenciesContainer,
} from '~/server/metiers/configuration/dependencies.container';
import { ApiLaBonneAlternanceMétierRepository } from '~/server/metiers/infra/apiLaBonneAlternanceMétier.repository';
import {
	getApiPoleEmploiOffresConfig,
	getApiPoleEmploiReferentielsConfig,
} from '~/server/offres/configuration/pole-emploi/poleEmploiHttpClient.config';
import {
	ApiPoleEmploiOffreErrorManagementServiceGet,
	ApiPoleEmploiOffreErrorManagementServiceSearch,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiErrorManagement.service';
import {
	ApiPoleEmploiRéférentielRepository,
} from '~/server/offres/infra/repositories/pole-emploi/apiPoleEmploiRéférentiel.repository';
import {
	PoleEmploiParamètreBuilderService,
} from '~/server/offres/infra/repositories/pole-emploi/poleEmploiParamètreBuilder.service';
import { RobotsDependencies, robotsDependenciesContainer } from '~/server/robots/configuration/dependencies.container';
import { CacheService } from '~/server/services/cache/cache.service';
import { NullCacheService } from '~/server/services/cache/nullCache.service';
import { RedisCacheService } from '~/server/services/cache/redisCache.service';
import { DefaultErrorManagementService } from '~/server/services/error/errorManagement.service';
import { AuthenticatedHttpClientService } from '~/server/services/http/authenticatedHttpClient.service';
import { CachedHttpClientService } from '~/server/services/http/cachedHttpClient.service';
import { PublicHttpClientService } from '~/server/services/http/publicHttpClient.service';
import { LoggerService } from '~/server/services/logger.service';
import { aLoggerService } from '~/server/services/logger.service.fixture';
import { PinoLoggerService } from '~/server/services/pinoLogger.service';
import ServerConfigurationService from '~/server/services/serverConfiguration.service';
import { FastXmlParserService } from '~/server/services/xml/fastXmlParser.service';
import {
	SitemapDependencies,
	sitemapDependenciesContainer,
} from '~/server/sitemap/configuration/dependencies.container';

export type Dependencies = {
	ficheMetierDependencies: FicheMetierDependencies
	alternanceDependencies: AlternanceDependencies;
	formationDependencies: FormationDependencies;
	formationInitialeDependencies: FormationInitialeDependencies;
	formationInitialeDetailDependencies: FormationInitialeDetailDependencies;
	métierDependencies: MétierDependencies;
	offreEmploiDependencies: OffresEmploiDependencies;
	cmsDependencies: CmsDependencies;
	engagementDependencies: EngagementDependencies;
	localisationDependencies: LocalisationDependencies;
	demandeDeContactDependencies: DemandeDeContactDependencies;
	entrepriseDependencies: EntrepriseDependencies;
	offreJobEteDependencies: OffresJobEteDependencies;
	offreJobÉtudiantDependencies: OffresJobÉtudiantDependencies
	robotsDependencies: RobotsDependencies;
	sitemapDependencies: SitemapDependencies;
	établissementAccompagnementDependencies: ÉtablissementAccompagnementDependencies;
	loggerService: LoggerService
	emploiEuropeDependencies: EmploiEuropeDependencies;
}

export function dependenciesContainer(): Dependencies {
	const serverConfigurationService = new ServerConfigurationService();
	let cacheService: CacheService;
	let loggerService: LoggerService;

	if (process.env.NODE_ENV === 'test') {
		loggerService = aLoggerService();
	}  else {
		loggerService = new PinoLoggerService(
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_DSN,
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_LOG_LEVEL,
			serverConfigurationService.getConfiguration().NEXT_PUBLIC_SENTRY_ENVIRONMENT,
		);
	}

	if (serverConfigurationService.getConfiguration().REDIS_URL !== '') {
		const redisUrl = serverConfigurationService.getConfiguration().REDIS_URL;
		cacheService = new RedisCacheService(redisUrl, loggerService);
	} else {
		cacheService = new NullCacheService();
	}

	const defaultErrorManagementService = new DefaultErrorManagementService(loggerService);

	const strapiAuthenticatedHttpClientService = new AuthenticatedHttpClientService(getAuthApiStrapiConfig(serverConfigurationService), loggerService);
	const strapiPublicHttpClientService = new PublicHttpClientService(getApiStrapiConfig(serverConfigurationService));
	const strapiErrorManagementService = new StrapiErrorManagementService(loggerService);
	const cmsRepository = new StrapiRepository(strapiPublicHttpClientService, strapiAuthenticatedHttpClientService, strapiErrorManagementService);
	const cmsDependencies = cmsDependenciesContainer(cmsRepository, serverConfigurationService);


	const poleEmploiRéférentielsHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiReferentielsConfig(serverConfigurationService), loggerService);
	const poleEmploiOffresHttpClientService = new AuthenticatedHttpClientService(getApiPoleEmploiOffresConfig(serverConfigurationService), loggerService);
	const apiPoleEmploiRéférentielRepository = new ApiPoleEmploiRéférentielRepository(poleEmploiRéférentielsHttpClientService, cacheService);
	const poleEmploiParamètreBuilderService = new PoleEmploiParamètreBuilderService(apiPoleEmploiRéférentielRepository);
	const apiPoleEmploiOffreErreurManagementServiceSearch = new ApiPoleEmploiOffreErrorManagementServiceSearch(loggerService);
	const apiPoleEmploiOffreErreurManagementServiceGet = new ApiPoleEmploiOffreErrorManagementServiceGet(loggerService);
	const apiPoleEmploiOffreRepository = new ApiPoleEmploiOffreRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreEmploiDependencies = offresEmploiDependenciesContainer(apiPoleEmploiOffreRepository);

	const apiPoleEmploiJobÉtudiantOffreRepository = new ApiPoleEmploiJobÉtudiantRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreJobÉtudiantDependencies = jobsÉtudiantsDependenciesContainer(apiPoleEmploiJobÉtudiantOffreRepository);

	const apiPoleEmploiJobEteOffreRepository = new ApiPoleEmploiJobEteRepository(poleEmploiOffresHttpClientService, poleEmploiParamètreBuilderService, cacheService, apiPoleEmploiOffreErreurManagementServiceSearch, apiPoleEmploiOffreErreurManagementServiceGet);
	const offreJobEteDependencies = jobsEteDependenciesContainer(apiPoleEmploiJobEteOffreRepository);

	const laBonneAlternanceClientService = new PublicHttpClientService(getApiLaBonneAlternanceConfig(serverConfigurationService));
	const apiLaBonneAlternanceCaller = serverConfigurationService.getConfiguration().API_LA_BONNE_ALTERNANCE_CALLER;
	const apiLaBonneAlternanceAlternanceErrorManagementServiceSearch = new ApiLaBonneAlternanceErrorManagementServiceSearch(loggerService);
	const apiLaBonneAlternanceAlternanceErrorManagementServiceGet = new ApiLaBonneAlternanceErrorManagementServiceGet(loggerService);
	const apiLaBonneAlternanceRepository = new ApiLaBonneAlternanceRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller, apiLaBonneAlternanceAlternanceErrorManagementServiceSearch, apiLaBonneAlternanceAlternanceErrorManagementServiceGet);
	const apiLaBonneAlternanceFormationRepository = new ApiLaBonneAlternanceFormationRepository(laBonneAlternanceClientService, apiLaBonneAlternanceCaller, defaultErrorManagementService);
	const apiLaBonneAlternanceMétierRepository = new ApiLaBonneAlternanceMétierRepository(laBonneAlternanceClientService, defaultErrorManagementService);

	const alternanceDependencies = alternancesDependenciesContainer(apiLaBonneAlternanceRepository);

	const trajectoiresProHttpClientService = new PublicHttpClientService(getApiTrajectoiresProConfig(serverConfigurationService));
	const geoHttpClientService = new CachedHttpClientService(getApiGeoGouvConfig(serverConfigurationService));
	const apiGeoErrorManagementService = new ApiGeoErrorManagementService(loggerService);
	const apiGeoLocalisationRepository = new ApiGeoRepository(geoHttpClientService, apiGeoErrorManagementService);
	const apiTrajectoiresProStatistiqueErrorManagementService = new ApiTrajectoiresProStatistiqueErrorManagementService(loggerService);
	const apiTrajectoiresProStatistiqueRepository = new ApiTrajectoiresProStatistiqueRepository(trajectoiresProHttpClientService, apiGeoLocalisationRepository, apiTrajectoiresProStatistiqueErrorManagementService);

	const formationDependencies = formationsDependenciesContainer(apiLaBonneAlternanceFormationRepository, apiTrajectoiresProStatistiqueRepository);

	const métierDependencies = métiersDependenciesContainer(apiLaBonneAlternanceMétierRepository);

	const isProd = serverConfigurationService.getConfiguration().ENVIRONMENT === 'production';

	const apiOnisepHttpClient = isProd
		? new AuthenticatedHttpClientService(getApiOnisepAuthenticatedConfig(serverConfigurationService), loggerService)
		: new PublicHttpClientService(getApiOnisepPublicConfig(serverConfigurationService));
	const onisepFormationInitialeRepository = new OnisepFormationInitialeRepository(apiOnisepHttpClient, defaultErrorManagementService);
	const formationInitialeDependencies = formationInitialeDependenciesContainer(onisepFormationInitialeRepository);

	const strapiFormationInitialeDetailRepository = new StrapiFormationInitialeDetailRepository(cmsRepository);
	const formationInitialeDetailDependencies = formationInitialeDetailDependenciesContainer(onisepFormationInitialeRepository, strapiFormationInitialeDetailRepository);

	const engagementHttpClientService = new PublicHttpClientService(getApiEngagementConfig(serverConfigurationService));
	const apiEngagementRepository = new ApiEngagementRepository(engagementHttpClientService, defaultErrorManagementService);
	const engagementDependencies = engagementDependenciesContainer(apiEngagementRepository);

	const apiAdresseErrorManagementService = new ApiAdresseErrorManagementService(loggerService);
	const adresseHttpClientService = new CachedHttpClientService(getApiAdresseConfig(serverConfigurationService));
	const apiAdresseRepository = new ApiAdresseRepository(adresseHttpClientService, apiAdresseErrorManagementService);
	const localisationDependencies = localisationDependenciesContainer(apiGeoLocalisationRepository, apiAdresseRepository, serverConfigurationService);

	const mailClientService = new PublicHttpClientService(getApiTipimailConfig(serverConfigurationService));
	const mailRepository = new TipimailRepository(
		mailClientService,
		defaultErrorManagementService,
		serverConfigurationService.getConfiguration().MAILER_SERVICE_ACTIVE === '1',
		serverConfigurationService.getConfiguration().MAILER_SERVICE_REDIRECT_TO || undefined,
	);
	const demandeDeContactAccompagnementRepository = new DemandeDeContactAccompagnementRepository(mailRepository);
	const demandeDeContactCEJRepository = new DemandeDeContactCEJRepository(cmsRepository);

	const demandeDeContactDependencies = demandeDeContactDependenciesContainer(
		demandeDeContactAccompagnementRepository,
		demandeDeContactCEJRepository,
	);

	const lesEntreprisesSEngagentHttpClientService = new PublicHttpClientService(getApiRejoindreLaMobilisationConfig(serverConfigurationService));
	const apiRejoindreLaMobilisationErrorManagementService = new ApiRejoindreLaMobilisationErrorManagementService(loggerService);
	const apiRejoindreLaMobilisationRepository = new ApiRejoindreLaMobilisationRepository(lesEntreprisesSEngagentHttpClientService, apiRejoindreLaMobilisationErrorManagementService);
	const entrepriseDependencies = entreprisesDependenciesContainer(apiRejoindreLaMobilisationRepository);

	const etablissementPublicHttpClientService = new PublicHttpClientService(getApiÉtablissementsPublicsConfig(serverConfigurationService));
	const apiEtablissementPublicRepository = new ApiÉtablissementPublicRepository(etablissementPublicHttpClientService, defaultErrorManagementService);
	const établissementAccompagnementDependencies = établissementAccompagnementDependenciesContainer(apiEtablissementPublicRepository);

	const ficheMetierRepository = new StrapiFicheMetierRepository(cmsRepository);
	const ficheMetierDependencies=  ficheMetierDependenciesContainer(ficheMetierRepository);

	const robotsDependencies = robotsDependenciesContainer(serverConfigurationService);

	const sitemapDependencies = sitemapDependenciesContainer(cmsRepository, ficheMetierRepository);

	const apiEuresHttpClientService = new PublicHttpClientService(getApiEuresPublicHttpClientConfig(serverConfigurationService));
	const apiEuresXmlService = new FastXmlParserService();
	const apiEuresEmploiEuropeMapper = new ApiEuresEmploiEuropeMapper(apiEuresXmlService);
	const apiEuresEmploiEuropeRepository = new ApiEuresEmploiEuropeRepository(apiEuresHttpClientService, defaultErrorManagementService, apiEuresEmploiEuropeMapper);

	const emploiEuropeDependencies = serverConfigurationService.getConfiguration().API_EURES_IS_MOCK_ACTIVE
		? emploiEuropeDependenciesContainer(new fixtureEmploiEuropeRepository(apiEuresEmploiEuropeMapper))
		: emploiEuropeDependenciesContainer(apiEuresEmploiEuropeRepository);

	return {
		alternanceDependencies,
		cmsDependencies,
		demandeDeContactDependencies,
		emploiEuropeDependencies,
		engagementDependencies,
		entrepriseDependencies,
		ficheMetierDependencies,
		formationDependencies,
		formationInitialeDependencies,
		formationInitialeDetailDependencies,
		localisationDependencies,
		loggerService,
		métierDependencies,
		offreEmploiDependencies,
		offreJobEteDependencies,
		offreJobÉtudiantDependencies,
		robotsDependencies,
		sitemapDependencies,
		établissementAccompagnementDependencies,
	};
}
