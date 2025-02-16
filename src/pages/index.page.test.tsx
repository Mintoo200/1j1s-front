/**
 * @jest-environment jsdom
 */


import '~/test-utils';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { AnalyticsService } from '~/client/services/analytics/analytics.service';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import { aMarketingService } from '~/client/services/marketing/marketing.service.fixture';
import Accueil from '~/pages/index.page';

describe('Page d‘accueil', () => {
	let analyticsService: AnalyticsService;
	let marketingService: MarketingService;

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({ asPath: '/' });
		analyticsService = anAnalyticsService();
		marketingService = aMarketingService();
	});

	it('n‘a pas de défaut d‘accessibilité', async () => {
		const { container } = render(
			<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
				<Accueil/>
			</DependenciesProvider>,
		);

		await expect(container).toBeAccessible();
	});

	describe('marketingService', () => {
		it('ne track pas la page si le feature flipping de la page est désactivé', () => {
			process.env.NEXT_PUBLIC_CAMPAGNE_ACCUEIL_FEATURE= '0';
			render(
				<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
					<Accueil/>
				</DependenciesProvider>,
			);
			
			expect(marketingService.trackPage).not.toHaveBeenCalled();
		});
		it('track la page si le feature flipping de la page est activé',   () => {
			process.env.NEXT_PUBLIC_CAMPAGNE_ACCUEIL_FEATURE= '1';
			render(
				<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
					<Accueil/>
				</DependenciesProvider>,
			);

			expect(marketingService.trackPage).toHaveBeenCalledWith('2023-09-1jeune1solution.gouv-PageAccueil-Arrivees');
		});
	});

	describe('jobs d‘été', () => {
		describe('quand le feature flip de jobs d‘été n‘est pas actif', () => {
			it('je ne vois pas la carte de redirection vers les jobs d‘été', () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '0';
				render(
					<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
						<Accueil/>
					</DependenciesProvider>,
				);
				expect(screen.queryByText('Jobs d‘été')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip de jobs d‘été est actif', () => {
			it('je vois la carte de redirection vers les jobs d‘été', async () => {
				process.env.NEXT_PUBLIC_JOB_ETE_FEATURE = '1';
				const user = userEvent.setup();

				render(
					<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
						<Accueil/>
					</DependenciesProvider>,
				);

				const voirPlusButton = screen.getByRole('button', { name: 'Voir plus de résultats sur les offres d‘emplois' });
				expect(voirPlusButton).toBeVisible();
				await user.click(voirPlusButton);

				expect(screen.queryByText('Des milliers d‘offres de jobs d‘été sélectionnées pour vous (durée maximale de 2 mois)')).toBeVisible();
			});
		});

	});
	describe('formations initiales', () => {
		describe('quand le feature flip des formations initales n‘est pas actif', () => {
			it('je ne vois pas la carte de redirection vers les formations initiales', () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '0';
				render(
					<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
						<Accueil/>
					</DependenciesProvider>,
				);
				expect(screen.queryByText('Formations initiales')).not.toBeInTheDocument();
			});
		});
		describe('quand le feature flip des formations initales est actif', () => {
			it('je vois la carte de redirection vers les formations initiales',  () => {
				process.env.NEXT_PUBLIC_FORMATIONS_INITIALES_FEATURE = '1';

				render(
					<DependenciesProvider analyticsService={analyticsService} marketingService={marketingService}>
						<Accueil/>
					</DependenciesProvider>,
				);

				const link = screen.getByRole('link', { name: /Plus de 6 000 formations accessibles pour réaliser votre projet et trouver un emploi/ });
				expect(link).toBeVisible();
				expect(link).toHaveAttribute('href', '/formations-initiales');
			});
		});
	});
});
