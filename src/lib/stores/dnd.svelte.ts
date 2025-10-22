import { ACTIVE_ZONE, DRAG_STATE, INSERT_MODE } from '$lib/utils/enums';
import form from './form.svelte';

class DndStore {
	#dragState = $state(DRAG_STATE.IDLE);
	#ghostElement = $state<HTMLElement | null>(null);
	#ghostElementHeight = $state(0);
	#dropIndex = $state<number | null>(null);
	#dropZoneWidth = $state(0);
	#dragIndex = $state<number | null>(null);
	#activeZone = $state<ACTIVE_ZONE | null>(null);
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

	get dragIndex(): number | null {
		return this.#dragIndex;
	}

	set dragIndex(index: number | null) {
		this.#dragIndex = index;
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

	get dropZoneReady(): boolean {
		return this.#dragState !== DRAG_STATE.IDLE;
	}

	get activeZone(): ACTIVE_ZONE | null {
		return this.#activeZone;
	}

	set activeZone(zone: ACTIVE_ZONE | null) {
		this.#activeZone = zone;
	}

	insertingMode(index: number = null): INSERT_MODE | null {
		if (this.#dragState !== DRAG_STATE.INSERTING && index === null && this.fieldCount === 0) return INSERT_MODE.NONE;
		if (this.#dragState === DRAG_STATE.INSERTING && index === null && this.fieldCount === 0) return INSERT_MODE.NEW;
		if (this.dropIndex === index && this.fieldCount > 0) return INSERT_MODE.INSIDE;
		if (
			(this.dragState === DRAG_STATE.INSERTING || this.dragState === DRAG_STATE.SORTING) &&
			this.dropIndex === this.fieldCount &&
			this.dropIndex === index + 1
		) {
			return INSERT_MODE.LAST;
		}
	}

	clear(): void {
		this.#dropIndex = null;
		this.#dragIndex = null;
		this.#dragState = DRAG_STATE.IDLE;
		this.#ghostElement = null;
		this.#ghostElementHeight = 0;
		this.#activeZone = null;
	}
}

export const dndStore = new DndStore();
