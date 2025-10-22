import type { DragEvent, EventHost } from '../../types';

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
