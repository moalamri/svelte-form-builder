<script lang="ts">
	import { getFieldComponent } from '$lib/utils/form';
	import { dndStore } from '$lib/stores/dnd.svelte';
	import Label from './Label.svelte';
	import Icon from '@iconify/svelte';

	const { field, component, mode }: { field: any; component?: any; mode: 'insert' | 'sort' } = $props();

	// Get the component to render the field
	const { Component } = getFieldComponent(field.type);
	const Render = component || Component;
</script>

<div
	class="fixed z-9000 pointer-events-none left-0 top-0 will-change-transform transition-opacity duration-200 animate-none opacity-0"
	style="width: {dndStore.dropZoneWidth}px;"
	data-testid="ghost-element-{field.type}"
	bind:this={dndStore.ghostElement}
	bind:clientHeight={dndStore.ghostElementHeight}
>
	<div class="relative flex bg-white border border-blue-600 rounded-sm shadow-slate-200 min-h-16">
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
</div>
