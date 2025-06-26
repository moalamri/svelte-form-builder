import { getEventHost, getElementUnder, getFieldElement, isDropZone, getDropIndex, createGhost } from '$lib/utils/dnd';
import { dndStore } from '$lib/stores/dnd.svelte';
import { addField } from '$lib/utils/form';
import type { DraggableProps } from '$lib/types';

/**
 * Svelte action that makes an element draggable for form building.
 * Handles both mouse and touch events for cross-platform compatibility.
 *
 * @param node - The HTML element to make draggable
 * @param config - Configuration object containing the element type
 * @returns Object with destroy method for cleanup
 *
 * @example
 * ```svelte
 * <div use:draggableElement={{ type: 'input' }}>
 *   Drag me to add an input field
 * </div>
 * ```
 */
export function draggableElement(node: HTMLElement, config: DraggableProps) {
	const { type: elemType } = config;

	// Initial cursor offset from element's top-left corner for ghost positioning
	let offsetX = 0;
	let offsetY = 0;
	// Visual ghost element that follows the cursor during drag
	let ghostElem: HTMLElement | null = null;
	// Reference to the currently dragged element
	let dragElem: HTMLElement | null = null;

	/**
	 * Updates the position of the ghost element to follow the cursor/touch point.
	 * @param event - Touch or mouse event containing position data
	 */
	function updateGhost(event: TouchEvent | MouseEvent) {
		if (!ghostElem) return;
		const coords = getEventHost(event) as Touch | MouseEvent;
		// Use transform for better performance (no layout recalculation)
		ghostElem.style.transform = `translate(${coords.clientX - offsetX}px, ${coords.clientY - offsetY}px) translateZ(0)`;
	}

	/**
	 * Updates drop zone indicators
	 * @param event - Touch or mouse event containing position data
	 */
	function updateDropZone(event: TouchEvent | MouseEvent) {
		const elemUnder = getElementUnder(event);
		if (isDropZone(elemUnder)) {
			const { element, index, rect } = getFieldElement(elemUnder);
			if (element && rect) {
				const coords = getEventHost(event) as Touch | MouseEvent;
				const centerY = rect.top + rect.height / 2;
				// Determine if we should drop before or after the target element
				const position = coords.clientY < centerY ? 'before' : 'after';
				dndStore.dropPosition = position;
				dndStore.hoverIndex = index;
			}
		}
	}

	/**
	 * Removes the ghost element from the DOM and cleans up references.
	 */
	function removeGhost() {
		if (ghostElem) {
			ghostElem.remove();
			ghostElem = null;
		}
	}

	/**
	 * Ends the drag operation and resets all state.
	 */
	function end() {
		dndStore.clear();
		removeGhost();
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
		const { element, x, y } = createGhost(node, event);
		ghostElem = element;
		offsetX = x;
		offsetY = y;
	}

	/**
	 * Handles drag movement, updating ghost position and drop indicators.
	 * Determines if the cursor is over a valid drop zone and calculates drop position.
	 * @param event - Touch or mouse move event
	 */
	function move(event: TouchEvent | MouseEvent) {
		if (!dragElem || !ghostElem) return;
		event.preventDefault();

		// Update ghost position immediately for responsiveness
		updateGhost(event);

		// Update drop zone indicators
		updateDropZone(event);
	}

	/**
	 * Handles the end of a drag operation.
	 * If dropped over a valid zone, adds the field to the form.
	 * @param event - Touch or mouse event that ended the drag
	 */
	function drop(event: TouchEvent | MouseEvent) {
		if (!dragElem) return;
		const elemUnder = getElementUnder(event);

		if (isDropZone(elemUnder)) {
			const { element, index } = getFieldElement(elemUnder);
			let insertIndex = index;

			if (element) {
				// Calculate the final drop index based on position
				insertIndex = getDropIndex(dndStore.dropPosition, index);
			}
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
			removeGhost();

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
