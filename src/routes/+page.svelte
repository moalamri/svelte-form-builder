<script lang="ts">
	import { isJsonModalOpen, isMobile, isPreview, showLPanel, showRPanel } from '$lib/stores/flags.svelte';
	import ElementsListPanel from '$lib/components/ElementsListPanel.svelte';
	import SettingsPanel from '$lib/components/SettingsPanel.svelte';
	import JsonModal from '$lib/components/JsonModal.svelte';
	import PaneResizer from './components/PaneResizer.svelte';
	import Header from './components/Header.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import { SPLITTER_IDS } from '$lib/utils/enums';
	import { machine, connect, type Props } from '@zag-js/splitter';
	import { useMachine, normalizeProps } from '@zag-js/svelte';

	const showLeftPanel = $derived(!isPreview.state && showLPanel.state);
	const showRightPanel = $derived(!isPreview.state && showRPanel.state);

	const id = $props.id();
	const service = useMachine<any>(machine, {
		id,
		defaultSize: [20, 60, 20],
		panels: [
			{ id: SPLITTER_IDS.ELEMENTS, minSize: 15, maxSize: 25 },
			{ id: SPLITTER_IDS.FORM, minSize: 50, maxSize: 100 },
			{ id: SPLITTER_IDS.EDITOR, minSize: 15, maxSize: 25 }
		]
	} as Props);
	const api = $derived(connect(service, normalizeProps));

	$effect(() => {
		showLPanel.state = !isMobile.state;
		showRPanel.state = !isMobile.state;
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

<div {...api.getRootProps()} class="min-h-[calc(100dvh-38px)]">
	{#if showLeftPanel}
		<div {...api.getPanelProps({ id: SPLITTER_IDS.ELEMENTS })} class="relative p-1 overflow-auto! bg-slate-100/50">
			<ElementsListPanel />
		</div>
		<PaneResizer {...api.getResizeTriggerProps({ id: SPLITTER_IDS.TRIGGER_ELEMENTS_TO_FORM })} />
	{/if}
	<div {...api.getPanelProps({ id: SPLITTER_IDS.FORM })} class="relative overflow-auto! p-1.5">
		<Form />
	</div>
	{#if showRightPanel}
		<PaneResizer {...api.getResizeTriggerProps({ id: SPLITTER_IDS.TRIGGER_FORM_TO_EDITOR })}></PaneResizer>
		<div {...api.getPanelProps({ id: SPLITTER_IDS.EDITOR })} class="relative p-1 overflow-auto! bg-slate-100/50">
			<SettingsPanel />
		</div>
	{/if}
</div>
