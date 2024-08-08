<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { showLPane, showRPane } from '$lib/utils/flags.svelte';
	import { isJsonModalOpen, isPreview } from '$lib/utils/flags.svelte';
	import Icon from '@iconify/svelte';
	import { StateHistory } from 'runed';

	let { fields = $bindable() } = $props();

	const history = new StateHistory(
		() => fields,
		(c) => (fields = c)
	);
</script>

<header class="flex justify-between items-center border-b-slate-200 border-b-2">
	<div class="p-1 font-semibold text-blue-950">SFB</div>

	<div class="p-1">
		{#if !isPreview.state}
			<div class="flex">
				<button class="rounded-md bg-slate-100 p-1 text-center outline-none" onclick={() => history.redo()} disabled={!history.canRedo}>
					<Icon icon="solar:undo-left-round-square-line-duotone" class="size-5 {history.canRedo ? 'text-blue-900' : 'text-slate-400'} scale-x-[-1]" />
				</button>
				<button class="rounded-md bg-slate-100 p-1 text-center outline-none" onclick={() => history.undo()} disabled={!history.canUndo}>
					<Icon icon="solar:undo-left-round-square-line-duotone" class="size-5 {history.canUndo ? 'text-blue-900' : 'text-slate-400'}" />
				</button>
				<p class="text-slate-200 px-2">|</p>
				<button class="rounded-md bg-slate-100 p-1 text-center outline-none" onclick={() => showLPane.toggle()}>
					<Icon icon="mynaui:panel-left" class="size-5  {showLPane.state ? 'text-blue-900' : 'text-slate-400'}" />
				</button>
				<button class="rounded-md bg-slate-100 p-1 text-center outline-none" onclick={() => showRPane.toggle()}>
					<Icon icon="mynaui:panel-right" class="size-5 {showRPane.state ? 'text-blue-900' : 'text-slate-400'}" />
				</button>
			</div>
		{/if}
	</div>

	<div class="p-1">
		<Button text="JSON" onclick={() => (isJsonModalOpen.state = true)} />
		<Button text={isPreview.state ? 'Edit' : 'Preview'} onclick={() => isPreview.toggle()} />
	</div>
</header>
