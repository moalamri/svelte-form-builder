<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { SORTABLEJS } from '$lib/utils/enums';
	import { isDragging } from '$lib/stores/flags.svelte';

	let { elements, title, dragComponent }: { elements: any[] | any; title: string; dragComponent: any } = $props();

	let dragArae: HTMLElement;

	$effect(() => {
		const sortable = new Sortable(dragArae, {
			group: {
				name: SORTABLEJS.GROUPNAME,
				pull: 'clone',
				put: false // Do not allow items to be put into this list
			},
			animation: 150,
			sort: false,
			onStart() {
				isDragging.state = true;
			},
			onEnd() {
				isDragging.state = false;
			},
			onRemove(event: SortableEvent) {
				// To remove the dragged element (Component Card) from the dropzone and avoid double components (act as pull : 'clone' in sortablejs).
				const { from, item, oldIndex, pullMode, clone } = event;
				if (pullMode === 'clone') {
					// Insert the node
					const refElement = from.children[oldIndex];
					from.insertBefore(item, refElement);
					// Self remove the copied clone element from dragzone
					if (clone.parentNode) {
						clone.parentNode.removeChild(clone);
					}
				}
			}
		});
		return () => sortable?.destroy();
	});
</script>

<div class="flex flex-col w-full space-y-2">
	<div class="bg-slate-400/10 py-1.5 px-2 rounded-xs">
		<p class="text-xs font-semibold text-slate-700">{title}</p>
	</div>
	<div bind:this={dragArae} class="lg:grid lg:grid-cols-3 flex flex-col gap-4">
		{#each elements as element (element.id)}
			{@render dragComponent(element)}
		{/each}
	</div>
</div>
