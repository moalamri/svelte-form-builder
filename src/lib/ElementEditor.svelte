<script lang="ts">
	import ElementSettings from '$lib/editor/ElementSettings.svelte';
	import { slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { form } from '$lib/stores/form.svelte';
</script>

<div class="flex flex-col w-full h-full space-y-1">
	<div class="flex space-x-1 items-center py-1">
		<Icon icon="fluent:options-20-regular" class="size-0 md:size-4 text-slate-500" />
		<p class="text-sm md:text-md font-semibold text-slate-800">Editor</p>
	</div>
	{#if form.activeElement}
		<div transition:slide={{ duration: 100 }} class="pb-2">
			<ElementSettings />
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center w-full h-full">
			<p class="text-sm text-slate-700 mx-auto">Select a field to edit</p>
		</div>
	{/if}
</div>
