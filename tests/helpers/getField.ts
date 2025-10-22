export function getFieldElement(element: HTMLElement): { element: HTMLElement | null; index: number; centerY: number } {
	const field = element.closest('[data-form-element]') as HTMLElement | null;
	const indexAttr = field?.getAttribute('data-form-element');
	const rect = field?.getBoundingClientRect();

	return {
		element: field,
		index: indexAttr ? Number(indexAttr) : 0,
		centerY: rect?.top + rect?.height / 2
	};
}
