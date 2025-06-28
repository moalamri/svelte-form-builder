<script lang="ts">
	import { isJsonModalOpen, isMobile, isPreview, showLPanel, showRPanel } from '$lib/stores/flags.svelte';
	import ElementsListPanel from '$lib/components/ElementsListPanel.svelte';
	import SettingsPanel from '$lib/components/SettingsPanel.svelte';
	import JsonModal from '$lib/components/JsonModal.svelte';
	import PaneResizer from './components/PaneResizer.svelte';
	import Header from './components/Header.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import { Splitter } from 'ui-ingredients';
	import { SPLITTER_IDS } from '$lib/utils/enums';

	let activeResizer = $state();

	const showLeftPanel = $derived(!isPreview.state && showLPanel.state);
	const showRightPanel = $derived(!isPreview.state && showRPanel.state);
	const activeResizerLeft = $derived(activeResizer === SPLITTER_IDS.TRIGGER_ELEMENTS_TO_FORM);
	const activeResizerRight = $derived(activeResizer === SPLITTER_IDS.TRIGGER_FORM_TO_EDITOR);

	$effect(() => {
		if (isMobile.state) {
			showLPanel.state = false;
			showRPanel.state = false;
		}
	});
</script>

<svelte:head>
	<title>Svelte Form Builder</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />

{#if isJsonModalOpen.state}
	<JsonModal />
{/if}

<Splitter.Root
	panels={[
		{ id: SPLITTER_IDS.ELEMENTS, minSize: 15, maxSize: 25 },
		{ id: SPLITTER_IDS.FORM, minSize: 50, maxSize: 100 },
		{ id: SPLITTER_IDS.EDITOR, minSize: 15, maxSize: 25 }
	]}
	defaultSize={[20, 60, 20]}
	style="height: calc(100vh - 38px); justify-content: center;"
	onResize={(details) => {
		activeResizer = details.resizeTriggerId;
	}}
	onResizeEnd={(_) => {
		activeResizer = undefined;
	}}
>
	{#if showLeftPanel}
		<Splitter.Panel id={SPLITTER_IDS.ELEMENTS} class="relative p-1 overflow-auto! bg-slate-100/50">
			<ElementsListPanel />
		</Splitter.Panel>
	{/if}
	<Splitter.ResizeTrigger id={SPLITTER_IDS.TRIGGER_ELEMENTS_TO_FORM} class="focus:outline-hidden pe-1">
		<PaneResizer isActive={activeResizerLeft} />
	</Splitter.ResizeTrigger>
	<Splitter.Panel id={SPLITTER_IDS.FORM} class="relative overflow-auto! p-1.5">
		<Form />
	</Splitter.Panel>
	<Splitter.ResizeTrigger id={SPLITTER_IDS.TRIGGER_FORM_TO_EDITOR} class="focus:outline-hidden ps-1">
		<PaneResizer isActive={activeResizerRight} />
	</Splitter.ResizeTrigger>
	{#if showRightPanel}
		<Splitter.Panel id={SPLITTER_IDS.EDITOR} class="relative p-1 overflow-auto! bg-slate-100/50">
			<SettingsPanel />
		</Splitter.Panel>
	{/if}
</Splitter.Root>
