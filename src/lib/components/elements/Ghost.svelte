<script lang="ts">
	import { getFieldComponent } from '$lib/utils/form';
	import { dndStore } from '$lib/stores/dnd.svelte';
	import Label from './Label.svelte';
	import Icon from '@iconify/svelte';
	import ElementCard from './ElementCard.svelte';
	import { ACTIVE_ZONE } from '$lib/utils/enums';

	const { field, component, mode }: { field: any; component?: any; mode: 'insert' | 'sort' } = $props();

	// Get the component to render the field
	const { Component } = getFieldComponent(field.type);
	const Render = component || Component;

	$inspect(dndStore.dropZoneWidth);
</script>

<div
	class="fixed z-9000 pointer-events-none left-0 top-0 opacity-0"
	data-testid="ghost-element-{field.type}"
	bind:this={dndStore.ghostElement}
	bind:clientHeight={dndStore.ghostElementHeight}
>
	{#if dndStore.activeZone === ACTIVE_ZONE.DRAGZONE}
		<div class="min-w-14 min-h-14 opacity-50">
			<ElementCard element={field} />
		</div>
	{:else}
		<div class="relative flex bg-white border border-blue-600 rounded-sm shadow-slate-200 min-h-16" style="width: {dndStore.dropZoneWidth}px;">
			{#if mode === 'sort'}
				<div class="flex flex-col items-center border-e border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-s-sm p-1 gap-2 w-6">
					<Icon icon="fluent:drag-24-regular" class="handle cursor-move text-slate-600" />
				</div>
			{/if}
			<div class="relative flex flex-col justify-center p-2 w-full">
				<Label {field} />
				<Render {field} />
			</div>
		</div>
	{/if}
</div>
