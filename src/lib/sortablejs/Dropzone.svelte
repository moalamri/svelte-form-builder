<script lang="ts">
	import Sortable, { type Options } from 'sortablejs';

	let { fields = $bindable(), options, formfield }: { fields: any[]; options: Options; formfield: any } = $props();

	let element: HTMLElement;

	$effect(() => {
		const sortable = new Sortable(element, {
			...options
		});
		return () => sortable?.destroy();
	});
</script>

<div bind:this={element} class="flex flex-col space-y-1.5 min-h-10">
	{#each fields as field (field.id)}
		{@render formfield(field)}
	{/each}
</div>
