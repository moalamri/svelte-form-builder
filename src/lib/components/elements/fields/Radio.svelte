<script lang="ts">
	let { field }: { field: any } = $props();

	// TODO - Implement the value change method for Radio field
</script>

<div class="relative flex w-full" class:flex-col={field.settings?.layout?.inline === false}>
	{#each field.settings.items as item (item.value)}
		{@const checked = item.value === field.value || item.checked}
		<div class="flex items-center justify-start">
			<input type={field.type} id={item.value} name={field.name} value={item.value} {checked} />
			<span class="mx-1">{item.label}</span>
		</div>
	{/each}
</div>
