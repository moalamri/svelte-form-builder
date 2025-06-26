class DndStore {
          #draggingState = $state(false);
          #dropPosition = $state<string | null>(null);
          #hoverIndex = $state<number | null>(null);

          get isDragging() {
                    return this.#draggingState;
          }

          set isDragging(value: boolean) {
                    this.#draggingState = value;
          }

          get dropPosition() {
                    return this.#dropPosition;
          }

          set dropPosition(value: string | null) {
                    this.#dropPosition = value;
          }

          get hoverIndex() {
                    return this.#hoverIndex;
          }

          set hoverIndex(value: number | null) {
                    this.#hoverIndex = value;
          }

          clear() {
                    this.#draggingState = false;
                    this.#dropPosition = null;
                    this.#hoverIndex = null;
          }
}

export const dndStore = new DndStore();