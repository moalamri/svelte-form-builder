<script lang="ts">
	let { field, updator }: { field: any; updator: Function } = $props();
	let selected = $state([]);

	const items = field.settings.data.values;

	function handleUpdate(event) {
		const checked = event.target.checked;
		if (checked) {
			selected = [...selected, event.target.value];
			updator(field.id, selected);
		} else {
			selected = selected.filter((item) => item !== event.target.value);
			updator(field.id, selected);
		}
	}
</script>

<div class="relative flex w-full" class:flex-col={field.settings?.layout?.fields?.inline.value === false}>
	{#each items as item}
		<div class="flex items-center justify-start">
			<input
				type="checkbox"
				name={item.name}
				id={item.name}
				disabled={field?.attributes?.disabled}
				value={item.value}
				checked={item.checked}
				onchange={(e) => handleUpdate(e)}
			/>
			<span class="mx-1">{item.label}</span>
		</div>
	{/each}
</div>
