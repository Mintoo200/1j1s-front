/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render, screen } from '@testing-library/react';

import {
	aFormulaireÉtapeEntreprise,
	aFormulaireÉtapeStage,
} from '~/client/components/features/OffreDeStage/Déposer/StageDeposerOffre.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLocalStorage, mockSessionStorage } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStageService } from '~/client/services/stage/stageService.fixture';
import DeposerOffreStageEtape3Page from '~/pages/stages/deposer-offre/localisation/index.page';

describe('<DeposerOffreStageEtape3Page />', () => {
	let getSessionItem: jest.Mock;
	let setLocalItem: jest.Mock;
	let removeSessionItem: jest.Mock;

	beforeEach(() => {
		setLocalItem = jest.fn();
		removeSessionItem = jest.fn();
		getSessionItem = jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeStage()));
		mockLocalStorage({
			getItem: jest.fn().mockReturnValue(JSON.stringify(aFormulaireÉtapeEntreprise())),
			setItem: setLocalItem,
		});
		mockSessionStorage({ getItem: getSessionItem, removeItem: removeSessionItem });
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		const { container } = render(
			<DependenciesProvider
				stageService={aStageService()}
			>
				<DeposerOffreStageEtape3Page />
			</DependenciesProvider>,
		);

		await screen.findByText('Etape 3 sur 3 : Localisation du stage');

		expect(container).toBeAccessible();
	});
});