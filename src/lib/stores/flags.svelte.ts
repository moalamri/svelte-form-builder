export const showLPanel = flag(true);
export const showRPanel = flag(true);
export const isJsonModalOpen = flag(false);
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
