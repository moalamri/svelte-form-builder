<script lang="ts">
	const { field }: { field: any } = $props();
</script>

<p
	class="text-slate-700"
	style="font-size: {field.settings?.fontStyle?.fontSize || '24'}px; font-weight: {field.settings?.fontStyle?.fontWeight || 'bold'}"
>
	{field.settings.properties?.text}
</p>
