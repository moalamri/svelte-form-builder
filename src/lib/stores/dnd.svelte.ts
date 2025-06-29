import { DRAG_STATE, INSERT_MODE } from '$lib/utils/enums';
import form from './form.svelte';


class DndStore {
	#dragState = $state(DRAG_STATE.IDLE);
	#ghostElement = $state<HTMLElement | null>(null);
	#ghostElementHeight = $state(0);
	#dropIndex = $state<number | null>(null);
	#dropZoneWidth = $state(0);
	fieldCount = $derived(form.fields.length);

	get dragState(): DRAG_STATE {
		return this.#dragState;
	}

	set dragState(state: DRAG_STATE) {
		this.#dragState = state;
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

	get dropZoneWidth(): number {
		return this.#dropZoneWidth;
	}

	set dropZoneWidth(width: number) {
		this.#dropZoneWidth = width;
	}

	insertingMode(index: number = null): INSERT_MODE | null {
		if (this.#dragState !== DRAG_STATE.INSERTING && index === null && this.fieldCount === 0) return INSERT_MODE.NONE;
		if (this.#dragState === DRAG_STATE.INSERTING && index === null && this.fieldCount === 0) return INSERT_MODE.NEW;
		if (this.dropIndex === index && this.fieldCount > 0) return INSERT_MODE.INSIDE;
		if (this.dropIndex === this.fieldCount && this.dropIndex === index + 1 && this.dragState === DRAG_STATE.INSERTING) {
			return INSERT_MODE.LAST;
		}
	}

	clear(): void {
		this.#ghostElement = null;
		this.#ghostElementHeight = 0;
		this.#dropIndex = null;
		this.#dropZoneWidth = 0;
		this.#dragState = DRAG_STATE.IDLE;
	}
}

export const dndStore = new DndStore();
