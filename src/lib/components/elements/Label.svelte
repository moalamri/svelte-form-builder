<script lang="ts">
	const { field, isRequired = false }: { field: any; isRequired?: boolean } = $props();
</script>

<div class="flex items-center justify-between px-1 w-full">
	<!-- TODO: remove field.name & field.label when all elements are updated with new schema -->
	<label for={field.settings.properties.name} class="text-slate-7 mb-1 text-sm">
		{field.settings.properties.label}
		{#if isRequired}
			<span class="px-1 font-semibold text-red-500">*</span>
		{/if}
	</label>
</div>
