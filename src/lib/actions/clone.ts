import { getEventHost, getElementUnder, getFieldElement, isDropZone, getDropIndex } from '$lib/utils/dnd/helpers';
import ghost from '$lib/utils/dnd/ghost';
import { dndStore } from '$lib/stores/dnd.svelte';
import { addField } from '$lib/utils/form';
import type { CloneOptions } from '$lib/types';

export function clone(node: HTMLElement, options: CloneOptions) {
	const { type: elemType } = options;

	// Reference to the currently dragged element
	let dragElem: HTMLElement | null = null;

	/**
	 * Updates drop zone indicators
	 * @param event - Touch or mouse event containing position data
	 */
	function updateDropZone(event: TouchEvent | MouseEvent) {
		const elemUnder = getElementUnder(event);
		if (isDropZone(elemUnder)) {
			if (dndStore.formFields === 0) {
				dndStore.dropPosition = 'before';
				dndStore.hoverIndex = 0;
				return;
			}
			const { element, index, rect } = getFieldElement(elemUnder);
			if (element && rect) {
				const coords = getEventHost(event) as Touch | MouseEvent;
				const centerY = rect.top + rect.height / 2;
				// Determine if we should drop before or after the target element
				const position = coords.clientY < centerY ? 'before' : 'after';
				dndStore.dropPosition = position;
				dndStore.hoverIndex = index;
			}
		} else {
			dndStore.dropPosition = null;
			dndStore.hoverIndex = null;
		}
	}

	/**
	 * Ends the drag operation and resets all state.
	 */
	function end() {
		dndStore.clear();
		ghost.remove();
		dragElem = null;
	}

	/**
	 * Handles the start of a drag operation.
	 * Creates a ghost element and initializes drag state.
	 * @param event - Touch or mouse event that initiated the drag
	 */
	function start(event: TouchEvent | MouseEvent) {
		event.preventDefault();
		dndStore.isDragging = true;
		dragElem = node;

		// Create the ghost element that will follow the cursor
		ghost.create(node, event);
	}

	/**
	 * Handles drag movement, updating ghost position and drop indicators.
	 * Determines if the cursor is over a valid drop zone and calculates drop position.
	 * @param event - Touch or mouse move event
	 */
	function move(event: TouchEvent | MouseEvent) {
		if (!dragElem) return;
		event.preventDefault();

		// Update ghost position immediately for responsiveness
		ghost.update(event);

		// Update drop zone indicators
		updateDropZone(event);
	}

	/**
	 * Handles the end of a drag operation.
	 * If dropped over a valid zone, adds the field to the form.
	 * @param event - Touch or mouse event that ended the drag
	 */
	function drop(_: TouchEvent | MouseEvent) {
		if (!dragElem) return;
		if (dndStore.hoverIndex !== null && dndStore.dropPosition !== null) {
			// Calculate the final drop index based on position
			const insertIndex = getDropIndex(dndStore.dropPosition, dndStore.hoverIndex);
			// Add the new field to the form
			addField(elemType, insertIndex);
		}
		end();
	}

	// Register event listeners for touch and mouse interactions
	node.addEventListener('touchstart', start);
	node.addEventListener('touchmove', move);
	node.addEventListener('touchend', drop);
	node.addEventListener('mousedown', start);

	// Document-level listeners for mouse events to handle dragging outside the element
	document.addEventListener('mousemove', move);
	document.addEventListener('mouseup', drop);

	return {
		/**
		 * Cleanup function called when the element is destroyed.
		 * Removes all event listeners to prevent memory leaks.
		 */
		destroy() {
			// Clean up
			ghost.remove();

			// Remove touch event listeners
			node.removeEventListener('touchstart', start);
			node.removeEventListener('touchmove', move);
			node.removeEventListener('touchend', drop);
			// Remove mouse event listeners
			node.removeEventListener('mousedown', start);
			// Remove document-level mouse listeners
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', drop);
		}
	};
}
