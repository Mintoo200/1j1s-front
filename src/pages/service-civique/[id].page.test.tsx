/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import ConsulterMissionEngagementPage from '~/pages/service-civique/[id].page';
import { anAmbassadeurDuDonDeVêtementMission } from '~/server/engagement/domain/missionEngagement.fixture';

describe('<ConsulterMissionEngagementPage />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
			>
				<ConsulterMissionEngagementPage missionEngagement={anAmbassadeurDuDonDeVêtementMission()} />
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});
});
