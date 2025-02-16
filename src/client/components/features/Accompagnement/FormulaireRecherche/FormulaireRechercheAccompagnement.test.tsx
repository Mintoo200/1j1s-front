/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import {
	FormulaireRechercheAccompagnement,
} from '~/client/components/features/Accompagnement/FormulaireRecherche/FormulaireRechercheAccompagnement';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';

describe('FormulaireRechercheAccompagnement', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	describe('lorsqu‘on recherche par commune', () => {
		it('filtre les résultats par localisation',  async() => {
			// GIVEN
			const routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			const localisationServiceMock = aLocalisationService();

			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheAccompagnement />
				</DependenciesProvider>,
			);

			const user = userEvent.setup();
			const inputCommune = screen.getByTestId('InputCommune');
			await user.type(inputCommune, 'Pari');
			const résultatsCommune = await screen.findByTestId('RésultatsCommune');
			const resultListCommune = within(résultatsCommune).getAllByRole('option');
			fireEvent.click(resultListCommune[0]);
			const submitButton = screen.getByRole('button', { name: 'Rechercher' });

			// WHEN
			fireEvent.submit(submitButton);

			// THEN
			expect(routerPush).toHaveBeenCalledWith({ query: 'libelleCommune=Paris+%2875006%29&codeCommune=75056' }, undefined, { shallow: true });
		});
	});
	describe('lorsqu‘on recherche par type d‘accompagnement', () => {
		let localisationServiceMock: LocalisationService;
		let routerPush: jest.Mock;

		beforeEach(() => {
			routerPush = jest.fn();
			mockUseRouter({ push: routerPush });
			localisationServiceMock = aLocalisationService();
		});
		it('affiche le filtre type d‘accompagnement', () => {
			render(
				<DependenciesProvider localisationService={localisationServiceMock}>
					<FormulaireRechercheAccompagnement />
				</DependenciesProvider>,
			);

			const selectTypeAccompagnement = screen.getByRole('button', { expanded: false });
			expect(selectTypeAccompagnement).toBeInTheDocument();
		});
	});

	it('rempli les champs du formulaire avec les query params', async () => {
		mockUseRouter({ query: {
			codeCommune: '75001',
			libelleCommune: 'Paris (75001)',
			typeAccompagnement: 'pole_emploi',
		} });

		render(
			<DependenciesProvider localisationService={aLocalisationService()}>
				<FormulaireRechercheAccompagnement/>
			</DependenciesProvider>,
		);

		const localisation = screen.getByRole('textbox', { name: /Localisation/i });
		expect(localisation).toHaveValue('Paris (75001)');
		const typeAccompagnement = screen.getByTestId('Select-InputHidden');
		expect(typeAccompagnement).toHaveValue('pole_emploi');
	});
});
