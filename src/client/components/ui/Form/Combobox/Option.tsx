import React, { useCallback, useId } from 'react';

import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

import { useCombobox } from './ComboboxContext';
import { matchesInput } from './utils';

type OptionProps = React.ComponentPropsWithoutRef<'li'>;
export const Option = React.forwardRef<HTMLLIElement, OptionProps>(function Option({
	id: idProps,
	onClick: onClickProps,
	...optionProps
}, outerRef) {
	const ref = useSynchronizedRef(outerRef);
	const idState = useId();
	const id = idProps ?? idState;
	const {
		state: { activeDescendant, value },
		onOptionSelection,
	} = useCombobox();
	const selected = activeDescendant === id;
	const hidden = !matchesInput(ref.current, value);
	const onClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
		onOptionSelection(event.currentTarget);
		if (onClickProps) {
			onClickProps(event);
		}
	}, [onClickProps, onOptionSelection]);
	return (
		<li
			role="option"
			aria-selected={selected}
			hidden={hidden}
			id={id}
			tabIndex={-1}
			onClick={onClick}
			ref={ref}
			{...optionProps}
		/>
	);
});