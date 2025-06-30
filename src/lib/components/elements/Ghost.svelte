<script lang="ts">
	import { getFieldComponent } from '$lib/utils/form';
	import { dndStore } from '$lib/stores/dnd.svelte';
	import Label from './Label.svelte';

	const { field, originalComponent }: { field: any; originalComponent?: any } = $props();

	// Get the component to render the field
	const { RenderComponent } = getFieldComponent(field.type);
	const Render = originalComponent || RenderComponent;
</script>

<div
	class="fixed z-9000 pointer-events-none left-0 top-0 will-change-transform transition-none animate-none scale-99 opacity-0"
	style="width: {dndStore.dropZoneWidth}px;"
	data-testid="ghost-element-{field.type}"
	bind:this={dndStore.ghostElement}
	bind:clientHeight={dndStore.ghostElementHeight}
>
	<div class="relative flex bg-white border rounded-sm shadow-slate-200">
		<div class="flex flex-col items-center border-e border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-s-sm p-1 gap-2 w-6 min-h-16"></div>
		<div class="relative flex flex-col justify-center p-2 w-full bg-white rounded-e-sm">
			<Label {field} />
			<Render {field} />
		</div>
	</div>
</div>
