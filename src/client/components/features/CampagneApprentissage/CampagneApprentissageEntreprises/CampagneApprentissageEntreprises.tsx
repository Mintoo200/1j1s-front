import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissageEntreprises
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises/EnSavoirPlusApprentissageEntreprises';
import {
	InformationSurEmbaucheApprenti,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/InformationSurEmbaucheApprenti/InformationSurEmbaucheApprenti';
import {
	Raisons,
	RaisonsDeChoisirApprentissage,
} from '~/client/components/features/CampagneApprentissage/RaisonsDeChoisirApprentissage/RaisonsDeChoisirApprentissage';
import VideosCampagneApprentissage
	from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideosCampagneApprentissage';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { TYPE_SIMULATEUR } from '~/pages/apprentissage/simulation/index.page';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

interface CampagneApprentissageEntreprisesProps {
	videos: Array<VideoCampagneApprentissage>
}

export function CampagneApprentissageEntreprises({ videos }: CampagneApprentissageEntreprisesProps) {
	const { isSmallScreen } = useBreakpoint();
	const raisons: Raisons[] = [
		{
			iconName: 'award',
			text: 'Former votre futur collaborateur',
		},
		{
			iconName: 'account',
			text: <>Transmettre votre <span>savoir-faire</span> </>,
		},
		{
			iconName: 'euro',
			text: 'Bénéficier d’aides pour le recrutement',
		},
		{
			iconName: 'sun',
			text: 'Découvrir de nouvelles idées et pratiques',
		},
		{
			iconName: 'thumb-up',
			text: 'Préparer l’avenir de votre entreprise',
		},
	];

	return (
		<>
			<header className={styles.titrePage}>
				<HeroWithIllustration image={'/images/campagne-apprentissage-entreprise-avec-texte.webp'} className={styles.hero}>
					<h1>L’apprentissage, pour mon entreprise <span className={styles.avoidLineBreakInside}>c’est le bon choix&nbsp;!</span></h1>
					<LinkStyledAsButtonWithIcon href={`/apprentissage/simulation?simulateur=${TYPE_SIMULATEUR.EMPLOYEUR}`} appearance={'asPrimaryButton'} className={styles.cta}>
						{ isSmallScreen ? 'Simuler le coût d’embauche' : 'Simuler le coût de l’embauche d’un apprenti'}
					</LinkStyledAsButtonWithIcon>
				</HeroWithIllustration>
			</header>
			<RaisonsDeChoisirApprentissage titre="5 bonnes raisons de choisir l’apprentissage :" raisons={raisons}
			/>
			<EnSavoirPlusApprentissageEntreprises/>
			{ videos.length > 0 &&
				<VideosCampagneApprentissage
					titre={'Ils ont choisi d’embaucher un apprenti ! Pourquoi pas vous ?'}
					description={'Découvrez les témoignages des maîtres d’apprentissage et des apprentis qu’ils accompagnent au quotidien.'}
					videos={videos}
				/>
			}
			<InformationSurEmbaucheApprenti/>
		</>
	);
}
