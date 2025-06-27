import type { DragEvent } from '$lib/types';
import { getEventHost } from './helpers';

class GhostElement {
	element: HTMLElement;
	x: number;
	y: number;

	/**
	 * Creates a visual ghost element that follows the cursor during drag operations.
	 * The ghost is a styled clone of the original element with reduced opacity.
	 * @param orignalElement - The original element to clone for the ghost
	 * @param event - The drag event containing initial position data
	 */
	create(orignalElement: HTMLElement, event: DragEvent) {
		const coords = getEventHost(event);
		const rect = orignalElement.getBoundingClientRect();

		// Calculate initial offset from element's top-left corner to cursor position
		this.x = coords.clientX - rect.left;
		this.y = coords.clientY - rect.top;

		// Create a visual clone of the dragged element
		const ghost = orignalElement.cloneNode(true) as HTMLElement;
		Object.assign(ghost.style, {
			position: 'fixed',
			zIndex: '9000',
			pointerEvents: 'none', // Prevent ghost from interfering with drop detection
			opacity: '0.7',
			width: `${orignalElement.clientWidth}px`,
			height: `${orignalElement.clientHeight}px`,
			left: '0px',
			top: '0px',
			// Use transform for positioning - better performance
			transform: `translate(${rect.x}px, ${rect.y}px) translateZ(0)`,
			willChange: 'transform', // Hint to browser for optimization
			transition: 'none', // Disable any transitions
			animation: 'none' // Disable any animations
		});

		document.body.appendChild(ghost);
		this.element = ghost;
	}

	/**
	 * Updates the position of the ghost element to follow the cursor/touch point.
	 * @param event - Touch or mouse event containing position data
	 */
	update(event: DragEvent) {
		const coords = getEventHost(event);
		this.element.style.transform = `translate(${coords.clientX - this.x}px, ${coords.clientY - this.y}px) translateZ(0)`;
	}

	/**
	 * Removes the ghost element from the DOM and cleans up references.
	 */
	remove() {
		if (this.element) {
			this.element.remove();
			this.element = null;
		}
	}
}

export default new GhostElement();
