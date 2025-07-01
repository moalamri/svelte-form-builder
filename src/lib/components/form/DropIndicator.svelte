<script lang="ts">
	import { dndStore } from '$lib/stores/dnd.svelte';

	const height = $derived(dndStore.ghostElementHeight);
</script>

<div style="height: {height}px; min-height: {height}px" class="bg-white border-[1.5px] border-blue-700/70 border-dotted w-full rounded-sm"></div>
