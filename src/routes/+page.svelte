<script lang="ts">
	import { isJsonModalOpen, isMobile, isPreview, showLPane, showRPane } from '$lib/stores/flags.svelte';
	import ElementsList from '$lib/ElementsList.svelte';
	import ElementEditor from '$lib/ElementEditor.svelte';
	import JsonModal from '$lib/components/JsonModal.svelte';
	import PaneResizer from './components/PaneResizer.svelte';
	import Header from './components/Header.svelte';
	import Form from '$lib/form/Form.svelte';
	import { Splitter } from 'ui-ingredients';
	import { SPLITTER_IDS } from '$lib/utils/enums';

	let activeResizer = $state();

	const showLeftPane = $derived(!isPreview.state && showLPane.state);
	const showRightPane = $derived(!isPreview.state && showRPane.state);
	const activeResizerLeft = $derived(activeResizer === SPLITTER_IDS.TRIGGER_ELEMENTS_TO_FORM);
	const activeResizerRight = $derived(activeResizer === SPLITTER_IDS.TRIGGER_FORM_TO_EDITOR);

	$effect(() => {
		if (isMobile.state) {
			showLPane.state = false;
			showRPane.state = false;
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
	{#if showLeftPane}
		<Splitter.Panel id={SPLITTER_IDS.ELEMENTS} class="relative p-1 overflow-auto bg-slate-100/50">
			<ElementsList />
		</Splitter.Panel>
	{/if}
	<Splitter.ResizeTrigger id={SPLITTER_IDS.TRIGGER_ELEMENTS_TO_FORM} class="focus:outline-hidden pe-1">
		<PaneResizer isActive={activeResizerLeft} />
	</Splitter.ResizeTrigger>
	<Splitter.Panel id={SPLITTER_IDS.FORM} class="relative overflow-auto p-1.5">
		<Form />
	</Splitter.Panel>
	<Splitter.ResizeTrigger id={SPLITTER_IDS.TRIGGER_FORM_TO_EDITOR} class="focus:outline-hidden ps-1">
		<PaneResizer isActive={activeResizerRight} />
	</Splitter.ResizeTrigger>
	{#if showRightPane}
		<Splitter.Panel id={SPLITTER_IDS.EDITOR} class="relative p-1 overflow-auto bg-slate-100/50">
			<ElementEditor />
		</Splitter.Panel>
	{/if}
</Splitter.Root>
