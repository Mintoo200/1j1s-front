import { Meta, StoryObj } from '@storybook/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { MetierService } from '~/client/services/metiers/metier.service';
import { createSuccess, Either } from '~/server/errors/either';
import { Metier } from '~/server/metiers/domain/metier';
import { aListeDeMetierLaBonneAlternance } from '~/server/metiers/domain/métier.fixture';

import { ComboboxMetiers } from '.';

const meta: Meta<typeof ComboboxMetiers> = {
	argTypes: {
		debounceTimeout: {
			description: 'Temps (en ms) attendu après la dernière saisie avant de lancer la récupération des métiers',
			table: {
				defaultValue: { summary: 300 },
			},
		},
		defaultValue: {
			description: 'Valeur par défaut du combobox',
		},
		label: {
			description: 'Libellé affiché devant le combobox',
		},
	},
	args: {
	},
	component: ComboboxMetiers,
	parameters: {
		docs: {
			controls: { exclude: ['onFocus','onChange', 'onBlur', 'onInput', 'filter', 'requireValidOption', 'valueName'] },
		},
	},
	title: 'Components/Form/Combobox/ComboboxMetiers',
};

class MetierServiceStub implements MetierService {
	async rechercherMetier(query: string): Promise<Either<Metier[]>> {
		return new Promise((resolve) => setTimeout(() => resolve(createSuccess(
			aListeDeMetierLaBonneAlternance()
				.filter((metier: Metier) => (
					metier.label.toLowerCase().includes(query.toLowerCase()))),
		)), 1000));
	}
}

export default meta;
type Story = StoryObj<typeof ComboboxMetiers>;
export const exemple: Story = {
	args: {
		debounceTimeout: 300,
	},
	render: ({ ...args }) => {
		return (
			<DependenciesProvider metierService={new MetierServiceStub()}>
				<ComboboxMetiers {...args} />
			</DependenciesProvider>
		);
	},
};

export const AvecPlaceholderEtDebounce: Story = {
	args: {
		debounceTimeout: 2000,
		placeholder: 'Exemples: enseignement, recherche ... ',
	},
	render: ({ ...args }) => {
		return (
			<DependenciesProvider metierService={new MetierServiceStub()}>
				<ComboboxMetiers {...args} />
			</DependenciesProvider>
		);
	},
};
