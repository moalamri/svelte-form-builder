import type { DragEvent, FieldElementInfo } from '$lib/types';
import { getEventHost } from './host';

export function getElementAtPosition(element: HTMLElement): { coords: { clientX: number; clientY: number }; element: HTMLElement | null } {
	const coords = getElementCoords(element);
	if (!coords) return { coords: null, element: null };
	return {
		coords,
		element: document.elementFromPoint(coords.clientX, coords.clientY) as HTMLElement | null
	};
}

export function getElementCoords(element: HTMLElement): { clientX: number; clientY: number } {
	const rect = element.getBoundingClientRect();
	return { clientX: rect.left, clientY: rect.top };
}

/**
 * Finds the HTML element currently under the cursor/touch point.
 * Uses document.elementFromPoint for accurate hit detection.
 *
 * @param event - Touch or mouse event containing position data
 * @returns The topmost element at the event coordinates, or null if none
 */
export function getElementUnder(event: DragEvent): HTMLElement | null {
	const coords = getEventHost(event);
	if (!coords) return null;
	return document.elementFromPoint(coords.clientX, coords.clientY) as HTMLElement | null;
}

/**
 * Finds the closest form field element and extracts its metadata.
 * Looks for elements with the 'data-form-element' attribute.
 */
export function getFieldElement(element: HTMLElement): FieldElementInfo {
	const field = element?.closest('[data-form-element]') as HTMLElement | null;
	const indexAttr = field?.getAttribute('data-form-element');
	const rect = field?.getBoundingClientRect();

	return {
		element: field,
		index: indexAttr ? Number(indexAttr) : 0,
		centerY: rect?.top + rect?.height / 2
	};
}
