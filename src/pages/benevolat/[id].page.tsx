import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import {
  ConsulterMissionEngagement,
} from '~/client/components/features/Engagement/Consulter/ConsulterMissionEngagement';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { Mission, MissionId } from '~/server/engagement/domain/engagement';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterMissionEngagementPageProps {
  missionEngagement: Mission;
}

export default function ConsulterMissionEngagementPage({ missionEngagement }: ConsulterMissionEngagementPageProps) {
  if (!missionEngagement) return null;

  return (
    <>
      <HeadTag title={`${missionEngagement.titre} | 1jeune1solution`} />
      <ConsulterMissionEngagement missionEngagement={ missionEngagement } />
    </>
  );
}

interface MissionContext extends ParsedUrlQuery {
  id: MissionId;
}

export async function getServerSideProps(context: GetServerSidePropsContext<MissionContext>): Promise<GetServerSidePropsResult<ConsulterMissionEngagementPageProps>> {
  if (!context.params) {
    throw new PageContextParamsException();
  }
  const { id } = context.params;
  const missionEngagement = await dependencies.engagementDependencies.consulterMissionEngagement.handle(id);

  if (missionEngagement.instance === 'failure') {
    return { notFound: true };
  }

  return {
    props: {
      missionEngagement: JSON.parse(JSON.stringify(missionEngagement.result)),
    },
  };
}