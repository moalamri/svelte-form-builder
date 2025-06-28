
class DndStore {
	#dragging = $state(false);
	#ghostElement = $state<HTMLElement | null>(null);
	#ghostElementHeight = $state(0);
	#dropIndex = $state<number | null>(null);
	#dropZoneWidth = $state(0);

	get isDragging(): boolean {
		return this.#dragging;
	}

	get dropIndex(): number | null {
		return this.#dropIndex;
	}

	set dropIndex(index: number | null) {
		this.#dropIndex = index;
	}

	get ghostElement(): HTMLElement | null {
		return this.#ghostElement;
	}

	set ghostElement(element: HTMLElement | null) {
		this.#ghostElement = element;
	}

	get ghostElementHeight(): number {
		return this.#ghostElementHeight;
	}

	set ghostElementHeight(height: number) {
		this.#ghostElementHeight = height;
	}

	set isDragging(active: boolean) {
		this.#dragging = active;
	}

	get dropZoneWidth(): number {
		return this.#dropZoneWidth;
	}

	set dropZoneWidth(width: number) {
		this.#dropZoneWidth = width;
	}

	clear(): void {
		this.#dragging = false;
		this.#ghostElement = null;
		this.#ghostElementHeight = 0;
		this.#dropIndex = null;
		this.#dropZoneWidth = 0;
	}
}

export const dndStore = new DndStore();
