import Image from 'next/image';
import banniereImage from 'public/images/cej.webp';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import styles from './Banniere.module.scss';

export default function Banniere() {
	const { isLargeScreen } = useBreakpoint();
	const titre = <>Le Contrat d’Engagement Jeune, la solution pour vous&nbsp;!</>;
	const accroche = 'Découvrez le CEJ, un parcours personnalisé pour vous aider à définir votre projet professionnel et trouver un emploi';

	return (
		<div className={styles.banniere}>
			<div className={styles.banniereContent}>
				<div className={styles.banniereTextContent}>
					<h1 className={styles.titre}>{titre}</h1>
					<p className={styles.banniereAccroche}>{accroche}</p>
					<LinkStyledAsButtonWithIcon
						className={styles.cta}
						href="#accompagnement"
						appearance={'asSecondaryButton'}
						icon={<Icon name="angle-right"/>}
						iconPosition={'right'}
					>
						{'Découvrir le CEJ'}
					</LinkStyledAsButtonWithIcon>
				</div>
			</div>
			{isLargeScreen && (
				<Image
					priority
					src={banniereImage}
					alt={'Contrat d‘engagement jeune, finie la galère, trouvez un métier qui va vous plaire.'}
					width={800}
					height={400}
				/>
			)}
		</div>
	);
}

