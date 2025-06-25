<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { showLPanel, showRPanel } from '$lib/stores/flags.svelte';
	import { isJsonModalOpen, isPreview } from '$lib/stores/flags.svelte';
	import Icon from '@iconify/svelte';
	import { StateHistory } from 'runed';
	import form from '$lib/stores/form.svelte';

	const history = new StateHistory(
		() => $state.snapshot(form.fields),
		(c) => (form.fields = c)
	);
</script>

<header class="flex justify-between items-center border-b-slate-200 border-b-2">
	<div class="p-1 font-semibold text-blue-950" data-testid="header-title">SFB</div>

	<div class="p-1">
		{#if !isPreview.state}
			<div class="flex space-x-1">
				<Button variant="secondary" size="xs" onclick={() => history.undo()} disabled={!history.canUndo}>
					<Icon icon="solar:undo-left-round-square-line-duotone" class="size-5 {history.canUndo ? 'text-blue-900' : 'text-slate-400'}" />
				</Button>
				<Button variant="secondary" size="xs" onclick={() => history.redo()} disabled={!history.canRedo}>
					<Icon icon="solar:undo-left-round-square-line-duotone" class="size-5 {history.canRedo ? 'text-blue-900' : 'text-slate-400'} scale-x-[-1]" />
				</Button>
				<div class="bg-slate-200/60 w-[1px] min-h-full"></div>
				<Button variant="secondary" size="xs" onclick={() => showLPanel.toggle()} data-testid="toggle-left-panel">
					<Icon icon="mynaui:panel-left" class="size-5  {showLPanel.state ? 'text-blue-900' : 'text-slate-400'}" />
				</Button>
				<Button variant="secondary" size="xs" onclick={() => showRPanel.toggle()} data-testid="toggle-right-panel">
					<Icon icon="mynaui:panel-right" class="size-5 {showRPanel.state ? 'text-blue-900' : 'text-slate-400'}" />
				</Button>
			</div>
		{/if}
	</div>

	<div class="p-1">
		<Button class="min-w-18" onclick={() => (isJsonModalOpen.state = true)}>JSON</Button>
		<Button class="min-w-18" onclick={isPreview.toggle}>{isPreview.state ? 'Edit' : 'Preview'}</Button>
	</div>
</header>
