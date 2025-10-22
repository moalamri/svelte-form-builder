<script lang="ts">
	import { dndStore } from '$lib/stores/dnd.svelte';
	import { DRAG_STATE } from '$lib/utils/enums';

	const show = $derived((dndStore.dragState === DRAG_STATE.IDLE || dndStore.dragState === DRAG_STATE.DRAGGING) && dndStore.fieldCount === 0);
</script>

{#if show}
	<div class="flex flex-col items-center justify-center gap-0.5 text-slate-400 min-h-14">
		<img src="empty.svg" alt="Empty form" width="64" class="opacity-40" />
		<p class="text-xs text-slate-500/90">Drag and drop an element here</p>
	</div>
{/if}
