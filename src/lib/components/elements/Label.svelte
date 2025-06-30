<script lang="ts">
	const { field, isRequired = false }: { field: any; isRequired?: boolean } = $props();
</script>

{#if field.settings.properties.label}
	<div class="flex items-center justify-between px-1 w-full">
		<label for={field.settings.properties.name} class="text-slate-7 mb-1 text-sm">
			{field.settings.properties.label}
			{#if isRequired}
				<span class="px-1 font-semibold text-red-500">*</span>
			{/if}
		</label>
	</div>
{/if}
