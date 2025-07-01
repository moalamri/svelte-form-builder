<script lang="ts">
	let { field }: { field: any } = $props();

	// TODO - Implement the value change method for Radio field
</script>

<div class="relative flex w-full gap-1.5" class:flex-col={field.settings?.layout?.inline === false}>
	{#each field.settings.items as item (item.value)}
		{@const checked = item.value === field.value || item.checked}
		<div class="flex items-center justify-start gap-1">
			<input type={field.type} id={item.value} name={field.name} value={item.value} {checked} class="size-3.5" />
			<span class="text-sm">{item.label}</span>
		</div>
	{/each}
</div>
