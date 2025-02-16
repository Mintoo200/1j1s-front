import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect } from 'react';

import { RechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois/index.analytics';

export default function RechercherOffreEmploiPage() {
	const router = useRouter();
	useAnalytics(analytics);

	useEffect(() => {
		if (router.isReady) {
			const queryString = stringify(router.query);
			if (queryString.length === 0) router.replace({ query: 'page=1' }, undefined, { shallow: true });
		}
	}, [router]);

	return <RechercherOffreEmploi />;
}

// NOTE (GAFI 08-08-2023): Rend le composant server-side
export function getServerSideProps() {
	return {
		props: {},
	};
}
