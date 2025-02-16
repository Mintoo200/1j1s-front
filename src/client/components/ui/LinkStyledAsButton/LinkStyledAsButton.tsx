import classNames from 'classnames';
import React, { PropsWithChildren, useMemo } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { useIsInternalLink } from '~/client/hooks/useIsInternalLink';

import styles from './LinkStyledAsButton.module.scss';

type ButtonAppearance = 'asPrimaryButton' | 'asSecondaryButton' | 'asTertiaryButton' | 'asQuaternaryButton';

type IconPosition = 'top' | 'left' | 'right';

type IconProps = {
	icon: React.ReactNode;
	iconPosition: IconPosition;
} | {
	icon?: never;
	iconPosition?: never;
}

interface LinkStyledAsButtonProps extends React.ComponentPropsWithoutRef<'a'> {
	href: string
	appearance: ButtonAppearance
	prefetch?: boolean
}


type LinkStyledAsButtonWithIconProps = LinkStyledAsButtonProps & IconProps

export function LinkStyledAsButton(props: PropsWithChildren<LinkStyledAsButtonProps>){
	const {
		appearance,
		children,
		className,
		href,
		prefetch = false,
		...rest
	} = props;

	const appearanceClass = useMemo(() => {
		switch (appearance) {
			case 'asPrimaryButton':
				return styles.primaryButton;
			case 'asSecondaryButton':
				return styles.secondaryButton;
			case 'asTertiaryButton':
				return styles.tertiaryButton;
			case 'asQuaternaryButton':
				return styles.quaternaryButton;
		}
	}, [appearance]);


	return (
		<Link href={href} prefetch={prefetch} className={classNames(className, appearanceClass)} {...rest}>
			{children}
		</Link>
	);
}


export function LinkStyledAsButtonWithIcon(props: PropsWithChildren<LinkStyledAsButtonWithIconProps> ) {
	const {
		children,
		className,
		iconPosition,
		icon,
		href,
		...rest
	} = props;
	const isInternalLink = useIsInternalLink(href);

	const iconClass = useMemo(() => {
		switch (iconPosition) {
			case 'top':
				return styles.linkWithTopIcon;
			case 'left':
				return styles.linkWithLeftIcon;
			case 'right':
				return styles.linkWithRightIcon;
		}
	}, [iconPosition]);

	const linkStyledAsButtonWithIconBody = useMemo(() => {
		switch (iconPosition) {
			case 'top':
			case 'left':
				return <>{icon}<span className={styles.linkLabel}>{children}</span></>;
			case 'right':
				return <><span className={styles.linkLabel}>{children}</span>{icon}</>;
			default:
				return <>
					<span className={styles.linkLabel}>{children}</span>
					{	isInternalLink ? <Icon name="arrow-right"/> : <Icon name="external-redirection"/>}
				</>;
		}
	}, [icon, iconPosition, children, isInternalLink]);

	return (
		<LinkStyledAsButton href={href} className={classNames(className, iconClass)} {...rest}>
			{linkStyledAsButtonWithIconBody}
		</LinkStyledAsButton>
	);
}
