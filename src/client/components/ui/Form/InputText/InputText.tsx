import classNames from 'classnames';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Form/InputText/InputText.module.scss';
import { useSynchronizedRef } from '~/client/hooks/useSynchronizedRef';

type InputValue = string | ReadonlyArray<string> | number | undefined;

interface TextInputProps extends React.ComponentPropsWithoutRef<'input'> {
  hint?: string
  label?: string
  necessity?: 'optional' | 'required'
  validation?: (value: InputValue) => string | null | undefined;
  tooltip?: React.ReactNode
}

// eslint-disable-next-line react/display-name
export const InputText = React.forwardRef<HTMLInputElement | null, TextInputProps>((props: TextInputProps, outerRef) => {
	const {
		className,
		defaultValue,
		hint,
		label,
		necessity,
		onChange,
		value: outerValue,
		validation,
		tooltip,
		...rest
	} = props;
	const ref = useSynchronizedRef(outerRef);
	const [valueState, setValueState] = useState<typeof defaultValue>(defaultValue ?? '');
	const [error, setError] = useState<string | undefined>(undefined);
	const [touched, setTouched] = useState(false);

	useLayoutEffect(function validateInput() {
		if (validation) {
			const error = validation(valueState);
			ref.current?.setCustomValidity(error ?? '');
		}
	}, [validation, valueState, ref]);

	useLayoutEffect(function checkInputValidity() {
		if (ref.current && touched) {
			const isValid = ref.current.checkValidity();
			setError(!isValid ? ref.current.validationMessage : undefined);
		}
	}, [ref, touched, valueState]);

	useEffect(function onValueChange() {
		setValueState(outerValue || '');
	}, [outerValue]);

	const inputId = useRef(uuidv4());
	const hintId = useRef(uuidv4());
	const errorId = useRef(uuidv4());

	const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event);
		}
		setValueState(event.target.value);
	}, [onChange]);

	return (
		<div className={classNames(styles.textInput, className)}>
			{label && (
				<>
					<label className={styles.textInputLabel} htmlFor={inputId.current}>
						{label}
						{tooltip && tooltip}
						{necessity && (
							<span className="text-small"> (champ {necessity === 'required' ? 'obligatoire' : 'optionnel'})</span>
						)}
					</label>
				</>
			)}
			<input
				ref={ref}
				{...rest}
				id={inputId.current}
				aria-describedby={hint && hintId.current}
				aria-invalid={!!error}
				aria-errormessage={error && errorId.current}
				className={classNames(styles.textInputField, touched && styles.textInputFieldTouched)}
				onChange={onInputChange}
				onBlur={() => setTouched(true) }
				value={valueState}
			/>
			{error && (
				<p className={classNames(styles.textInputHint, styles.textInputHintError)} id={errorId.current}>
					{error}
				</p>
			)}
			{(!error && hint) && (
				<p className={classNames(styles.textInputHint)} id={hintId.current}>
					{hint}
				</p>
			)}
		</div>
	);
});
