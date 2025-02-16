/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { LocalisationService } from '~/client/services/localisation/localisation.service';
import { createSuccess } from '~/server/errors/either';

jest.setTimeout(10000);
describe('<Accompagnement />', () => {
	beforeEach(() => {
		mockSmallScreen();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	function renderComponent () {
		const demandeDeContactService  : DemandeDeContactService  = {
			envoyerPourLeCEJ: jest.fn().mockResolvedValue(createSuccess(undefined)),
			envoyerPourLesEntreprisesSEngagent: jest.fn().mockResolvedValue(createSuccess(undefined)),
		} as unknown as DemandeDeContactService;
		const localisationService = {} as unknown as LocalisationService;


		render(
			<DependenciesProvider demandeDeContactService={demandeDeContactService} localisationService={localisationService}>
				<Accompagnement />
			</DependenciesProvider>,
		);

	}

	describe('quand il se passe rien', () => {
		it('on affiche le composant avec 3 boutons', () => {
			// Given
			renderComponent();
			const premierBouton = screen.getByText('Oui, je suis accompagné(e) par la Mission Locale');
			const deuxiemeBouton = screen.getByText('Oui, je suis accompagné(e) par Pôle emploi');
			const troisiemeBouton = screen.getByText('Non, je ne bénéficie d‘aucun accompagnement');
			// Then
			expect(premierBouton).toBeVisible();
			expect(deuxiemeBouton).toBeVisible();
			expect(troisiemeBouton).toBeVisible();
		});
	});

	describe('quand on clique sur Non, je ne bénéficie d‘aucun accompagnement', () => {
		it('ça affiche le formulaire avec l‘âge du capitaine', async () => {
			// Given
			const pasDAccompagnement = 'Non, je ne bénéficie d‘aucun accompagnement';
			const quelÂgeAvezVous = 'Quel âge avez-vous ?';

			renderComponent();
			const troisièmeBouton = screen.getByText(pasDAccompagnement);

			// When
			await userEvent.click(troisièmeBouton);

			// Then
			const preuveDExistence = screen.getByText(quelÂgeAvezVous);
			expect(troisièmeBouton).not.toBeVisible();
			expect(preuveDExistence).toBeVisible();
		});
	});

	describe('quand on clique sur Entre 18 et 25 ans', () => {
		it('ça affiche le formulaire des dispositifs', async () => {
			// Given
			const contenuModal = 'Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?';
			const titreModal = 'Découvrez les dispositifs référencés sur le portail 1jeune1solution';

			renderComponent();

			// When
			await userEvent.click(screen.getByRole('button',{ name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Entre 18 et 25 ans' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Non' }));

			// Then
			expect(await screen.findByText(titreModal)).toBeVisible();
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
	});

	describe('quand on clique sur Plus de 25 ans', () => {
		it('ça affiche le formulaire des dispositifs', async () => {
			// Given
			const contenuModal = 'Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?';
			const titreModal = 'Découvrez les dispositifs référencés sur le portail 1jeune1solution';

			renderComponent();

			// When
			await userEvent.click(screen.getByRole('button',{ name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Plus de 25 ans' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Non' }));

			// Then
			expect(await screen.findByText(titreModal)).toBeVisible();
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
		it('ça affiche le formulaire Handicap', async () => {
			// Given
			const contenuModal = 'Êtes-vous en situation de handicap (RQTH) ?';

			renderComponent();

			// When
			await userEvent.click(screen.getByRole('button',{ name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Plus de 25 ans' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Oui' }));

			// Then
			expect(screen.getByText(contenuModal)).toBeVisible();
		});
		it('ça te renvoie chez Pôle emploi sur la page Inscription', async () => {
			// Given
			const contenuModal = 'Vous pouvez bénéficier des services de Pôle emploi';
			const inscriptionPoleEmploi = 'S‘inscrire à Pôle emploi';

			renderComponent();
			// When
			await userEvent.click(screen.getByRole('button',{ name: 'Non, je ne bénéficie d‘aucun accompagnement' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Plus de 25 ans' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Oui' }));
			await userEvent.click(screen.getByRole('button',{ name: 'Non' }));

			// Then
			expect(screen.getByText(contenuModal)).toBeVisible();
			const link = screen.getByRole('link', { name: inscriptionPoleEmploi });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', expect.stringContaining('https://candidat.pole-emploi.fr/inscription-en-ligne/accueil'));
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('title', `${inscriptionPoleEmploi} - nouvelle fenêtre`);
		});
	});

	describe('quand on clique sur Oui je suis accompagné par la Mission Locale', () => {
		it('ça te renvoie sur le formulaire Mission Locale', async () => {
			// Given
			const missionLocale = 'Oui, je suis accompagné(e) par la Mission Locale';
			renderComponent();
			const premierBouton = screen.getByText(missionLocale);
			// When
			await userEvent.click(premierBouton);

			// Then
			expectFormulaireDeContact();
			expect(true).toEqual(true);
		});
	});


	describe('quand on clique sur Oui je suis accompagné par Pôle emploi', () => {
		it('ça te renvoie chez Pôle emploi', async () => {
			// Given
			const poleEmploi = 'Oui, je suis accompagné(e) par Pôle emploi';
			const jeContacteMonConseiller = 'Contacter mon conseiller';
			renderComponent();

			// When
			await userEvent.click(screen.getByText(poleEmploi));

			// Then
			const link = screen.getByRole('link', { name: jeContacteMonConseiller });
			expect(link).toBeVisible();
			expect(link).toHaveAttribute('href', expect.stringContaining('pole-emploi.fr'));
			expect(link).toHaveAttribute('target', '_blank');
			expect(link).toHaveAttribute('title', `${jeContacteMonConseiller} - nouvelle fenêtre`);
		});
	});

	describe('quand on clique sur Retour', () => {
		it('ça revient sur le formulaire de départ', async () => {
			// Given
			const pasDAccompagnement = 'Non, je ne bénéficie d‘aucun accompagnement';
			const retour = 'Retour';
			const quelÂgeAvezVous = 'Quel âge avez-vous ?';

			renderComponent();
			await userEvent.click(screen.getByText(pasDAccompagnement));

			// When
			await userEvent.click(screen.getByText(retour));

			// Then
			expect(screen.getByText(pasDAccompagnement)).toBeVisible();
			expect(screen.queryByText(quelÂgeAvezVous)).not.toBeInTheDocument();
		});
	});
});

function expectFormulaireDeContact() {
	expect(screen.getByText('Prénom')).toBeVisible();
	expect(screen.getByText('Nom')).toBeVisible();
	expect(screen.getByText('Adresse email')).toBeVisible();
	expect(screen.getByText('Age')).toBeVisible();
	expect(screen.getByText('Téléphone')).toBeVisible();
	expect(screen.getByText('Ville')).toBeVisible();
	expect(screen.getByText('Envoyer la demande')).toBeVisible();
}
