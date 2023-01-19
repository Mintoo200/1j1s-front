import classNames from 'classnames';
import Link from 'next/link';
import React, { useRef } from 'react';

import styles from '~/client/components/ui/Card/Article/ArticleCard.module.scss';
import { Card } from '~/client/components/ui/Card/Card';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function ArticleCardList({ children }: React.PropsWithChildren) {
	return (
		<div className={styles.articleListWrapper}>
			<ul className={styles.articleList} aria-label="Liste de nos articles">
				{React.Children.map(children, (child, index) => (
					<li key={index}>{child}</li>
				))}
			</ul>
		</div>
	);
}

interface ArticleCardProps {
	icon?: React.ReactNode
	imageSrc: string
	imageFit?: 'cover' | 'contain'
	titleLabel: string
	link: string
	linkLabel?: string
	vertical?: boolean
}

export function ArticleCard({
	className,
	children,
	icon,
	imageSrc,
	imageFit = 'cover',
	link,
	linkLabel = 'Lire l‘article',
	titleLabel,
	vertical = true,
}: ArticleCardProps & React.HTMLAttributes<HTMLLinkElement>) {
	const iconComponent = useRef(icon ? icon : <Icon name={'arrow-right'}/>);
	const imageClassName = classNames(styles.illustration, imageFit === 'contain' && styles.illustrationContain);
	const { isLargeScreen } = useBreakpoint();

	return (
		<Link href={link} className={classNames('underline-none', !vertical && styles.notOnlyVertical)}>
			<Card className={className} layout={vertical || !isLargeScreen ? 'vertical' : 'horizontal'}>
				<Card.Image className={imageClassName} src={imageSrc} aria-hidden/>
				<Card.Content className={styles.content}>
					<Card.Title className={styles.title} titleAs={'h3'}>{titleLabel}</Card.Title>
					{children}
					<Card.FakeLink className={styles.cta} appearance={'tertiary'} icon={iconComponent.current} label={linkLabel}/>
				</Card.Content>
			</Card>
		</Link>
	);
}
