import classNames from 'classnames';
import Image from 'next/legacy/image';
import React from 'react';

import { CommonProps } from '~/client/components/props';
import styles from '~/client/components/ui/Hero/Hero.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface HeroProps extends CommonProps {
  image?: string
  ariaHidden?: boolean
}

interface HeroIllustrationProps extends CommonProps {
	image: string
	ariaHidden?: boolean
}

export function Hero({ children, image, ariaHidden, className, ...rest }: React.PropsWithChildren<HeroProps>) {
	const { isLargeScreen } = useBreakpoint();

	return (
		<div className={classNames(className, styles.hero)} {...rest}>
			<h1 className={styles.heroTitle}>
				{children}
			</h1>
			{image && isLargeScreen && (
				<div className={styles.heroIllustration}>
					<Image src={image} alt="" layout="fill" objectFit="cover" objectPosition="top left" aria-hidden={ariaHidden}/>
				</div>
			)}
		</div>
	);
}

export function HeroWrapper({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={classNames(className, styles.hero)} {...rest}>
		{ children }
	</div>;
}

export function HeroTextWrapper({ children, className, ...rest }: React.PropsWithChildren<CommonProps>) {
	return <div className={classNames(styles.heroTextWrapper, className)} {...rest}>
		{children}
	</div>;
}

export function HeroTitle({ children, className, ...rest }: React.PropsWithChildren<CommonProps>) {
	return <h1 className={classNames(styles.heroTitle, className)} {...rest}>
		{children}
	</h1>;
}

export function HeroDescription({ children, className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
	return <p className={classNames(styles.heroDescription, className)} {...rest}>
		{children}
	</p>;
}

export function HeroIllustration({ className, image, ariaHidden, ...rest }: HeroIllustrationProps) {
	const { isLargeScreen } = useBreakpoint();
	if (isLargeScreen) {
		return <div className={classNames(styles.heroIllustration, className)} {...rest}>
			<Image src={image} alt="" layout="fill" objectFit="cover" objectPosition="top left" aria-hidden={ariaHidden}/>
		</div>;
	};
	return null;
}
