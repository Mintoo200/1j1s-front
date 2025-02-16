import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Error/ErrorLayout.module.scss';
import { HtmlHeadingTag } from '~/client/components/props';
import {
	LinkStyledAsButton,
} from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import useBreakpoint from '~/client/hooks/useBreakpoint';


interface ErrorLayoutProps {
	children: React.ReactNode
}

export function ErrorLayout(props: React.PropsWithChildren<ErrorLayoutProps>) {
	const { isSmallScreen } = useBreakpoint();
	const { children } = props;

	return (
		<Container className={styles.container}>
			<div>
				{children}
				<div className={styles.buttonWrapper}>
					<BackButton aria-label="Retourner à la page précédente" label="Retourner à la page précédente" appearance="primary" className={styles.backButton}/>
					<LinkStyledAsButton href="/" appearance="asSecondaryButton" className={styles.homeLink}>Aller à l‘accueil</LinkStyledAsButton>
				</div>
			</div>

			{!isSmallScreen &&
          <div className={styles.errorLogo}>
          	<Image src="/images/logos/technical-error.svg" alt="" width={185} height={205}/>
          </div>
			}
		</Container>
	);
}

function ErrorTitle({ children, className, id, titleAs }: {
	titleAs: HtmlHeadingTag
} & React.HTMLAttributes<HTMLTitleElement>) {
	return React.createElement(titleAs, { className: classNames(styles.title, className), id }, children);
}

function ErrorSubTitle({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p className={classNames('bold', styles.subtitle, className)}>{children}</p>;
}

function ErrorContent({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) {
	return <p className={className}>{children}</p>;
}

ErrorLayout.Title = ErrorTitle;
ErrorLayout.SubTitle = ErrorSubTitle;
ErrorLayout.Content = ErrorContent;
