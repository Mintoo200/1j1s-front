import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import JeDonneMonAvis from '~/client/components/features/JeDonneMonAvis/JeDonneMonAvis';
import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import { usePopstate } from '~/client/hooks/usePopstate';
import analytics from '~/pages/stages/[id].analytics';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterStagePageProps {
	offreDeStage: OffreDeStage;
}

export default function ConsulterOffreStagePage({ offreDeStage } : ConsulterStagePageProps) {
	useAnalytics(analytics);
	usePopstate();

	return (
		<>
			<Head
				title={`${offreDeStage.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterOffreDeStage offreDeStage={offreDeStage}/>
			<JeDonneMonAvis/>
		</>
	);
}

interface StageContext extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext<StageContext>): Promise<GetServerSidePropsResult<ConsulterStagePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id: slug } = context.params;

	const offreDeStage = await dependencies.cmsDependencies.consulterOffreStage.handle(slug);

	if (offreDeStage.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			offreDeStage: JSON.parse(JSON.stringify(offreDeStage.result)),
		},
	};
}
