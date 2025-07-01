import Ghost from '$lib/components/elements/Ghost.svelte';
import { dndStore } from '$lib/stores/dnd.svelte';
import { getEventHost } from './host';
import { mount, unmount } from 'svelte';
import type { DragEvent, GhostElementOptions } from '$lib/types';


class GhostElement {
	x: number;
	y: number;
	left: number;
	height: number;
	options: GhostElementOptions;
	originalElement: HTMLElement;
	ghostComponent: any;
	ghostElement: HTMLElement;

	/**
	 * Creates a visual ghost element that follows the cursor during drag operations.
	 * The ghost is a styled clone of the original element with reduced opacity.
	 * @param event - The drag event containing initial position data
	 * @param rect - The bounding client rect of the original dragged element
	 */
	create(event: DragEvent) {
		const coords = getEventHost(event);

		// Calculate the initial offset from the element's top-left corner to the cursor position
		const rect = this.originalElement.getBoundingClientRect();
		this.x = coords.clientX - rect.left;
		this.y = coords.clientY - rect.top;
		this.left = rect.left;
	}

	/**
	 * Updates the position of the ghost element to follow the cursor/touch point.
	 * @param event - Touch or mouse event containing position data
	 */
	update(event: DragEvent) {
		if (!dndStore.ghostElement) {
			return;
		}
		if (!this.ghostElement) {
			this.ghostElement = dndStore.ghostElement;
		}
		const coords = getEventHost(event);
		this.ghostElement.style.opacity = '0.95';
		this.ghostElement.style.scale = '0.99';
		this.ghostElement.style.transform = `translate(${coords.clientX - this.x}px, ${coords.clientY - this.y}px) translateZ(0)`;
	}

	/**
	 * Updates the y position of the ghost element to follow the cursor/touch point (for sorting form fields)
	 * @param event - Touch or mouse event containing position data
	 */
	updateY(event: DragEvent) {
		if (!dndStore.ghostElement) {
			return;
		}
		if (!this.ghostElement) {
			this.ghostElement = dndStore.ghostElement;
		}
		const coords = getEventHost(event);
		this.ghostElement.style.opacity = '0.95';
		this.ghostElement.style.transform = `translate(${this.left}px, ${coords.clientY - this.y}px) translateZ(0)`;
	}

	mount() {
		this.ghostComponent = mount(Ghost, {
			target: document.body,
			intro: false,
			props: this.options,
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
		this.originalElement = originalElement;
		this.create(event);
		this.mount();
	}
}

export default GhostElement;
