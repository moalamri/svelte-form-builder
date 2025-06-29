<script lang="ts">
	import { fade } from 'svelte/transition';
	import { dndStore } from '$lib/stores/dnd.svelte';
	import { DRAG_STATE } from '$lib/utils/enums';

	const show = $derived((dndStore.dragState === DRAG_STATE.IDLE || dndStore.dragState === DRAG_STATE.DRAGGING) && dndStore.fieldCount === 0);
</script>

{#if show}
	<div class="flex flex-col items-center justify-center gap-0.5 text-slate-400 min-h-14" in:fade={{ duration: 200, delay: 200 }}>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><!-- Icon from Lets Icons by Leonid Tsvetkov - https://creativecommons.org/licenses/by/4.0/ --><path
				fill="currentColor"
				d="M5 12h14v4c0 1.886 0 2.828-.586 3.414S16.886 20 15 20H9c-1.886 0-2.828 0-3.414-.586S5 17.886 5 16z"
			/><path
				fill="currentColor"
				fill-opacity="0.25"
				fill-rule="evenodd"
				d="M2.815 7.815L5 10v1h14v-1l2.185-2.185a1 1 0 0 0-.107-1.507l-2.512-1.883a1 1 0 0 0-1.155-.033L15 6H9L6.589 4.392a1 1 0 0 0-1.155.032L2.922 6.309a1 1 0 0 0-.107 1.507M8.6 7.2h6.8l1.95 2.6H6.65z"
				clip-rule="evenodd"
			/></svg
		>
		<p class="text-xs text-slate-500/90">Drag and drop an element here</p>
	</div>
{/if}
