import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import {
	CommonProps,
	HtmlHeadingTag,
} from '~/client/components/props';

import styles from './LightHero.module.scss';

interface LightHeroProps extends CommonProps{
	primaryText: string
	secondaryText?: string
  titleAs?: HtmlHeadingTag
}

export function LightHero({ primaryText, secondaryText, titleAs, className }: LightHeroProps) {

	function Title() {
		return React.createElement(titleAs || 'h1', {},
			<>
				<span className={styles.heroTitlePrimaryText}>{primaryText}</span>
			</>,
		);
	}

	return (
		<Container>
			<div className={classNames(styles.heroTitle, className)}>
				<Title/>
				<span className={classNames(styles.heroTitleSecondaryText)}>{secondaryText}</span>
			</div>
		</Container>
	);
} 

export function LightHeroWrapper({ children, className }: PropsWithChildren<CommonProps>) {
	return <Container className={className}>{children}</Container>;
}

export function LightHeroTextWrapper({ children, className }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroTitle, className)}>{children}</div>;
}

export function LightHeroPrimaryText({ children, className }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroTitlePrimaryText, className)}>{children}</div>;
}

export function LightHeroSecondaryText({ children, className }: PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroTitleSecondaryText, className)}>{children}</div>;
}
