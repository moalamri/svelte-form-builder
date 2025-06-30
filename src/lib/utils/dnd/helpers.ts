import type { DragEvent, EventHost, FieldElementInfo } from '$lib/types';

/**
 * Extracts the appropriate event coordinates (Touch or MouseEvent) from a drag event.
 * Handles the complexity of touch events which may have multiple touch points.
 *
 * @param event - Touch or mouse event
 * @returns The primary touch point or mouse event for position calculations
 */
export function getEventHost(event: DragEvent): EventHost {
	// Mouse events are straightforward
	if (event instanceof MouseEvent) return event;

	if (event instanceof TouchEvent) {
		// Priority order: changedTouches (for touchend), targetTouches, touches
		return event.changedTouches?.length
			? event.changedTouches[0]
			: event.targetTouches?.length
				? event.targetTouches[0]
				: event.touches?.length
					? event.touches[0]
					: null;
	}

	// Fallback (should not happen in normal usage)
	return event as EventHost;
}

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
	const field = element.closest('[data-form-element]') as HTMLElement | null;
	const indexAttr = field?.getAttribute('data-form-element');
	const rect = field?.getBoundingClientRect();

	return {
		element: field,
		index: indexAttr ? Number(indexAttr) : 0,
		centerY: rect?.top + rect?.height / 2
	};
}

/**
 * Determines if an element is within a valid drop zone.
 * Checks if the element or any of its ancestors has the dropzone ID.
 *
 * @param element - Element to check
 * @returns True if the element is within a drop zone
 */
export function isOnDropZone(element: HTMLElement | null): boolean {
	if (!element) return false;
	const zone = element.closest('#dropzone');
	return zone?.id === 'dropzone';
}

/**
 * Calculates the final insertion index based on cursor position relative to element center.
 * This directly returns the target index where the item should be placed.
 */
export function getDropIndex(coordY: number, centerY: number, index: number): number {
	return coordY < centerY ? index : index + 1;
}
