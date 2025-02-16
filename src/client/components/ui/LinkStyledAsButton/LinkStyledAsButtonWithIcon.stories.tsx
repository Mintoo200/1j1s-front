import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../Icon/Icon';
import { LinkStyledAsButtonWithIcon } from './LinkStyledAsButton';

const meta: Meta<typeof LinkStyledAsButtonWithIcon> = {
	argTypes: {
		icon: {
			// Gestion "manuelle" d'une prop qui accepte un composant React
			mapping: {
				'angle-left': <Icon name="angle-left" />,
				'angle-right': <Icon name="angle-right" />,
				'magnifying-glass': <Icon name="magnifying-glass" />,
			},
			options: ['magnifying-glass', 'angle-left', 'angle-right'],
		},
	},
	args:{
		children:'Cliquez ici',
		href:'https://www.1jeune1solution.gouv.fr/',
		prefetch:true,
	},
	component: LinkStyledAsButtonWithIcon,
	title: 'Components/LinkStyledAsButton/LinkStyledAsButtonWithIcon',
};
export default meta;
type Story = StoryObj<typeof LinkStyledAsButtonWithIcon>;

export const asPrimaryButton: Story = {
	args: {
		appearance: 'asPrimaryButton',
	},
};

export const asSecondaryButton: Story = {
	args: {
		appearance: 'asSecondaryButton',
	},
};
export const asTertiaryButton: Story = {
	args: {
		appearance: 'asTertiaryButton',
	},
};
export const asQuaternaryButton: Story = {
	args: {
		appearance: 'asQuaternaryButton',
	},
};
