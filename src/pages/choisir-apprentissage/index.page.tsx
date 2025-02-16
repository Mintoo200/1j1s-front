import { GetServerSidePropsResult } from 'next';

import {
	CampagneApprentissageJeunes,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/CampagneApprentissageJeunes';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';

import analyticsPageConfig from './index.analytics';


type ApprentissageJeunesPageProps = {
	videos: VideoCampagneApprentissage[];
}

export default function ApprentissageJeunes(props: ApprentissageJeunesPageProps) {
	useAnalytics(analyticsPageConfig);

	return (
		<>
			<Head title="Découvrir et trouver sa voie avec l’apprentissage | 1jeune1solution" robots="index,follow"/>
			<main id="contenu">
				<CampagneApprentissageJeunes videos={props.videos}/>
			</main>
		</>
	);
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<ApprentissageJeunesPageProps>> {
	const videos = await dependencies.cmsDependencies.recupererVideosCampagneApprentissage.handle();
	if (isFailure(videos)) {
		return {
			props: {
				videos: [],
			},
		};
	}

	return {
		props: {
			videos: videos.result,
		},
	};
}
