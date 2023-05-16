import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/VideosCampagneApprentissage/VideoFrame.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { VideoCampagneApprentissage } from '~/server/cms/domain/videoCampagneApprentissage.type';

const YOUTUBE_THUMBNAIL_URL = 'https://img.youtube.com/vi/';

function openCookiesPanel() {
	window.tarteaucitron.userInterface.openPanel();
}

interface VideoFrameProps extends React.ComponentPropsWithoutRef<'div'> {
	videoToDisplay: VideoCampagneApprentissage,
}

export function VideoFrame({ videoToDisplay, className }: VideoFrameProps) {
	const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);

	return <div className={classNames(styles.video, className)}>
		{areCookiesAccepted ? (
			<iframe
				width="326"
				height="180"
				src={`https://www.youtube-nocookie.com/embed/${videoToDisplay.videoId}`}
				title={videoToDisplay.titre}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				className={styles.iframe}
			/>
		) : (
			<>
				<Image
					src={`${YOUTUBE_THUMBNAIL_URL}${videoToDisplay.videoId}/0.jpg`}
					alt={''}
					width="326"
					height="180"
					className={styles.placeholderThumbnail}
				/>
				<div className={styles.placeholderContainer}>
					<div className={styles.placeholderContent}>
						<p>
                            Cette vidéo est hébergée par <Link href="https://www.youtube.com/t/terms">
								<TextIcon
									icon="external-redirection"
									iconPosition="right"
									className={styles.linkToYoutubeTerms}
								>
									youtube.com
								</TextIcon>
							</Link>
						</p>
						<p>
                            En l’affichant, vous acceptez ses conditions d’utilisation et les potentiels cookies déposés
                            par ce site.
						</p>
						<ButtonComponent
							label={'Accepter les cookies'}
							onClick={openCookiesPanel}
							appearance={'tertiary'}
							className={styles.buttonAcceptCookies}
							icon={<Icon className={styles.icon} name="mark-pen"/>}
							iconPosition="right"
						/>
					</div>
				</div>
			</>
		)
		}
	</div>;
}
