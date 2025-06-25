<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { SORTABLEJS } from '$lib/utils/enums';
	import { isDragging } from '$lib/stores/flags.svelte';
	import { onMount } from 'svelte';

	let { elements, title, dragComponent }: { elements: any[] | any; title: string; dragComponent: any } = $props();

	let dragArae: HTMLElement;

	onMount(() => {
		const sortable = new Sortable(dragArae, {
			group: {
				name: SORTABLEJS.GROUPNAME,
				pull: 'clone',
				put: false // Do not allow items to be put into this list
			},
			sort: false,
			onStart() {
				isDragging.state = true;
			},
			onEnd(event: SortableEvent) {
				const { from, item, clone, pullMode } = event;
				if (pullMode === 'clone') {
					// insert the dragged element back to the dragzone
					from.insertBefore(item, clone);
					// Self remove the copied clone element from dragzone
					from.removeChild(clone);
				}
				isDragging.state = false;
			}
		});
		return () => sortable?.destroy();
	});
</script>

<div class="flex flex-col w-full space-y-2">
	<div class="bg-slate-400/10 py-1.5 px-2 rounded-xs">
		<p class="text-xs font-semibold text-slate-700">{title}</p>
	</div>
	<div bind:this={dragArae} class="lg:grid lg:grid-cols-3 flex flex-col gap-4 select-none">
		{#each elements as element (element.id)}
			{@render dragComponent(element)}
		{/each}
	</div>
</div>
