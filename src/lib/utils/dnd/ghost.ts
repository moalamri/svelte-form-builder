import Ghost from '$lib/components/elements/Ghost.svelte';
import { dndStore } from '$lib/stores/dnd.svelte';
import { getEventHost } from './helpers';
import { mount, unmount } from 'svelte';
import type { DragEvent, GhostElementOptions } from '$lib/types';


class GhostElement {
	x: number;
	y: number;
	left: number;
	height: number;
	options: GhostElementOptions;
	ghostComponent: any;
	ghostElement: HTMLElement;

	/**
	 * Creates a visual ghost element that follows the cursor during drag operations.
	 * The ghost is a styled clone of the original element with reduced opacity.
	 * @param event - The drag event containing initial position data
	 * @param rect - The bounding client rect of the original dragged element
	 */
	create(originalElement: HTMLElement, event: DragEvent) {
		const coords = getEventHost(event);

		// Calculate the initial offset from the element's top-left corner to the cursor position
		const rect = originalElement.getBoundingClientRect();
		this.x = coords.clientX - rect.left;
		this.y = coords.clientY - rect.top;
		// dndStore.ghostElement.style.transform = `translate(${rect.left}px, ${rect.top}px) translateZ(0)`;
	}

	/**
	 * Updates the position of the ghost element to follow the cursor/touch point.
	 * @param event - Touch or mouse event containing position data
	 */
	update(event: DragEvent) {
		if (!dndStore.ghostElement) {
			return;
		}
		this.ghostElement = dndStore.ghostElement;
		const coords = getEventHost(event);
		this.ghostElement.style.opacity = '0.95';
		this.ghostElement.style.transform = `translate(${coords.clientX - this.x}px, ${coords.clientY - this.y}px) translateZ(0)`;
	}

	/**
	 * Updates the y position of the ghost element to follow the cursor/touch point (for sorting form fields)
	 * @param event - Touch or mouse event containing position data
	 */
	updateY(event: DragEvent) {

	}

	mount() {
		this.ghostComponent = mount(Ghost, {
			target: document.body,
			intro: false,
			props: {
				type: this.options.elementType,
				originalComponent: this.options.component,
				originalField: this.options.field
			},
		});
	}

	clear() {
		if (this.ghostComponent) {
			unmount(this.ghostComponent);
			this.ghostComponent = null;
		}
		if (this.ghostElement) {
			this.ghostElement.remove();
			this.ghostElement = null;
		}
	}

	constructor (originalElement: HTMLElement, event: DragEvent, options: GhostElementOptions) {
		this.options = options;
		this.mount();
		this.create(originalElement, event);
	}
}

export default GhostElement;
