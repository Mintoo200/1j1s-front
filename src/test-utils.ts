import { buildQueries, getAllByRole, getNodeText } from '@testing-library/dom';
import { act,within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

declare global {
	namespace jest {
		interface Matchers<R> {
			toBeAccessible(): Promise<R>
		}
	}
}

expect.extend(toHaveNoViolations);

function getTerms(container: HTMLElement, name: string | RegExp) {
	const terms = getAllByRole(container, 'term');
	// NOTE (GAFI 22-02-2023): filter instead of find because nothing forbids
	// 	the same term from appearing multiple times in the list
	return terms.filter(
		(term) => (
			typeof name === 'string'
				? getNodeText(term) === name
				: name.test(getNodeText(term))
		),
	);
}

function isDefinition(element: Element) {
	const definitions = within(element.parentElement as HTMLElement).getAllByRole('definition');
	return definitions.find((currentElement) => currentElement === element) != null;
}

function getDescriptionForTerm(term: HTMLElement) {
	let currentElement: Element | null = term;
	while (currentElement && !isDefinition(currentElement)) {
		currentElement = currentElement.nextElementSibling;
	}
	const descriptions = [];
	while (currentElement && isDefinition(currentElement)) {
		descriptions.push(currentElement);
		currentElement = currentElement.nextElementSibling;
	}
	return descriptions;
}

const queryAllByDescriptionTerm = (container: HTMLElement, name: string | RegExp) => {
	const terms = getTerms(container, name);

	const definitions = terms.flatMap(getDescriptionForTerm);

	return definitions as HTMLElement[];
};

expect.extend({
	toBeAccessible: async (htmlElement: HTMLElement) => {
		// NOTE (SULI 04-09-2023): l'appel à jest-axe fait évoluer un state du next/link
		// il faut attendre que tout le code de axe soit exécuté pour éviter les console.error sur les tests des pages utilisant un lien
		const results = await act(async () => await axe(htmlElement));

		return toHaveNoViolations.toHaveNoViolations(results);
	},
});

const [
	queryByDescriptionTerm,
	getAllByDescriptionTerm,
	getByDescriptionTerm,
	findAllByDescriptionTerm,
	findByDescriptionTerm,
] = buildQueries(
	queryAllByDescriptionTerm,
	(c, name) => `Found multiple descriptions from term with name of ${name}`,
	(c, name) => `Unable to find a description from term with name of ${name}`,
);

const queries = {
	findAllByDescriptionTerm,
	findByDescriptionTerm,
	getAllByDescriptionTerm,
	getByDescriptionTerm,
	queryAllByDescriptionTerm,
	queryByDescriptionTerm,
};

export {
	queries,
};
