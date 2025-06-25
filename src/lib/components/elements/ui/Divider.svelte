<script lang="ts">
	const { field }: { field: any } = $props();
</script>

<hr class="bg-slate-300" style="height: {field.settings?.properties?.height || '1'}px" />
