<script lang="ts">
	let { field, onchange }: { field: any; onchange: Function } = $props();
	let selected = $state([]);

	function handleUpdate(event) {
		const checked = event.target.checked;
		if (checked) {
			selected = [...selected, event.target.value];
			onchange(field.id, selected);
		} else {
			selected = selected.filter((item) => item !== event.target.value);
			onchange(field.id, selected);
		}
	}
</script>

<div class="relative flex w-full gap-1.5" class:flex-col={field.settings.layout?.inline === false}>
	{#each field.settings.items as item}
		<div class="flex items-center justify-start gap-1">
			<input
				type="checkbox"
				class="size-3.5"
				name={item.name}
				id={item.name}
				disabled={field.attributes?.disabled}
				value={item.value}
				checked={item.checked}
				onchange={(e) => handleUpdate(e)}
			/>
			<span class="text-sm">{item.label}</span>
		</div>
	{/each}
</div>
