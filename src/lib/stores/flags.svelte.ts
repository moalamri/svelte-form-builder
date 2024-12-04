export const showLPane = flag(true);
export const showRPane = flag(true);
export const isJsonModalOpen = flag(false);
export const isDragging = flag(false);
export const isPreview = flag(false);
export const isMobile = flag(false);

function flag(initial) {
	let state = $state(!!initial);

	return {
		toggle() {
			state = !state;
		},
		get state() {
			return state;
		},
		set state(value: boolean) {
			state = value;
		}
	};
}
