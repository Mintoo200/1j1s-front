import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/ui/ButtonAsLink/ButtonAsLink.module.scss';

export function ButtonAsLink(props: React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>) {
  const { children, className, ...rest } = props;

  return (
    <button type="button" className={classNames(styles.buttonAsLink, className)} {...rest}>{children}</button>
  );
}