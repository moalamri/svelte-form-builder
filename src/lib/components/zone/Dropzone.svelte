<script lang="ts">
	import form from '$lib/stores/form.svelte';

	type Props = {
		formfield: (field: any, index: number) => any;
	};

	let { formfield }: Props = $props();
</script>

<div class="relative flex flex-col space-y-1.5 min-h-10 p-1.5" data-testid="dropzone" id="dropzone">
	{#each form.fields as field, index (field.id)}
		{#key field.id}
			{@render formfield(field, index)}
		{/key}
	{/each}
</div>
