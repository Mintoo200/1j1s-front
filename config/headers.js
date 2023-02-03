const LOCAL_MODE_HEADERS = [];

const STRAPI_MEDIA_HOST = new URL(process.env.STRAPI_MEDIA_URL).hostname;
const BUCKET_S3_HOST = process.env.BUCKET_S3_URL;
const TRUSTED_SOURCES = '*.fabrique.social.gouv.fr ms-87beca55ce1c-338.sfo.meilisearch.io/indexes/fiche-metier/search ms-87beca55ce1c-338.sfo.meilisearch.io/indexes/offre-de-stage/search ms-87beca55ce1c-338.sfo.meilisearch.io/indexes/evenement/search ms-87beca55ce1c-338.sfo.meilisearch.io/indexes/annonce-de-logement/search ms-cd0e3bad8e5f-360.lon.meilisearch.io/indexes/fiche-metier/search ms-cd0e3bad8e5f-360.lon.meilisearch.io/indexes/offre-de-stage/search ms-cd0e3bad8e5f-360.lon.meilisearch.io/indexes/evenement/search ms-cd0e3bad8e5f-360.lon.meilisearch.io/indexes/annonce-de-logement/search 1j1s-front.osc-fr1.scalingo.io 1j1s-stage-content-manager.osc-fr1.scalingo.io *.1jeune1solution.gouv.fr';
const ANALYTICS_SOURCES = '*.xiti.com *.googletagmanager.com *.googleadservices.com *.google.com';
const contentSecurityPolicy = `
  default-src 'self' ${TRUSTED_SOURCES};
  script-src 'self' ${ANALYTICS_SOURCES};
  img-src 'self' *.google.com data: ${BUCKET_S3_HOST} ${STRAPI_MEDIA_HOST} ${ANALYTICS_SOURCES};
  style-src 'self' 'unsafe-inline';
  frame-ancestors 'none';
  frame-src *.apprentissage.beta.gouv.fr immersion-facile.beta.gouv.fr deposer-offre.www.1jeune1solution.gouv.fr *.youtube.com;
  form-action 'self';
  base-uri 'none';
`;

const SECURITY_MODE_HEADERS = [{
	headers: [{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	}, {
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	}, {
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	}, {
		key: 'Referrer-Policy',
		value: 'no-referrer, strict-origin-when-cross-origin',
	}, {
		key: 'Content-Security-Policy',
		value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
	}],
	source: '/:path*',
}];

module.exports = { LOCAL_MODE_HEADERS, SECURITY_MODE_HEADERS };