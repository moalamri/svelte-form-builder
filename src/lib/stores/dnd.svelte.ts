import type { DropPosition } from '$lib/types';

/**
 * Reactive store for managing drag and drop state across the application.
 * Uses Svelte 5's $state runes for fine-grained reactivity.
 *
 * Tracks:
 * - Whether a drag operation is currently active
 * - The position where an element should be dropped (before/after)
 * - The index of the element currently being hovered over
 */
class DndStore {
	/** Private reactive state for drag operation status */
	#dragging = $state(false);
	/** Private reactive state for drop position relative to hovered element */
	#dropPos = $state<DropPosition | null>(null);
	/** Private reactive state for the index of the currently hovered form element */
	#hoverIdx = $state<number | null>(null);

	/**
	 * Gets the current dragging state.
	 * @returns True if a drag operation is currently active
	 */
	get isDragging(): boolean {
		return this.#dragging;
	}

	/**
	 * Sets the dragging state.
	 * @param active - Whether a drag operation is active
	 */
	set isDragging(active: boolean) {
		this.#dragging = active;
	}

	/**
	 * Gets the current drop position relative to the hovered element.
	 * @returns 'before' | 'after' | null
	 */
	get dropPosition(): DropPosition | null {
		return this.#dropPos;
	}

	/**
	 * Sets the drop position relative to the hovered element.
	 * @param position - Position where the dragged element should be dropped
	 */
	set dropPosition(position: DropPosition | null) {
		this.#dropPos = position;
	}

	/**
	 * Gets the index of the form element currently being hovered over.
	 * @returns The zero-based index of the hovered element, or null if none
	 */
	get hoverIndex(): number | null {
		return this.#hoverIdx;
	}

	/**
	 * Sets the index of the form element currently being hovered over.
	 * @param index - The zero-based index of the element being hovered
	 */
	set hoverIndex(index: number | null) {
		this.#hoverIdx = index;
	}

	/**
	 * Resets all drag and drop state to initial values.
	 * Called when a drag operation ends or is cancelled.
	 */
	clear(): void {
		this.#dragging = false;
		this.#dropPos = null;
		this.#hoverIdx = null;
	}
}

/** Singleton instance of the DnD store for use across the application */
export const dndStore = new DndStore();
