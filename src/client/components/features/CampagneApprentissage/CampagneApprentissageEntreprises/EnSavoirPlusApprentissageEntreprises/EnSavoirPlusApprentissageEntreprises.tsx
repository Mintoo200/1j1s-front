import React from 'react';
import { Container } from 'src/client/components/layouts/Container/Container';

import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from './EnSavoirPlusApprentissageEntreprises.module.scss';

export default function EnSavoirPlusApprentissageEntreprises() {
	return <Container className={styles.enSavoirPlus}>
		<div className={styles.enSavoirPlusFaq}>
			<h2 className={styles.heading}>On répond à toutes vos questions <span>sur l’apprentissage</span></h2>
			<LinkStyledAsButtonWithIcon className={styles.link} href="/faq/apprentissage-employeurs-apprentis" appearance="asPrimaryButton">
				Consulter la FAQ
			</LinkStyledAsButtonWithIcon>
		</div>
		<div className={styles.enSavoirPlusDepotOffre}>
			<h2 className={styles.heading}>
				Vous êtes à la recherche d’un apprenti ?
			</h2>
			<LinkStyledAsButtonWithIcon className={styles.link} href="/apprentissage/deposer-offre" appearance="asPrimaryButton">
				Déposer une offre
			</LinkStyledAsButtonWithIcon>
		</div>
	</Container>;
}
