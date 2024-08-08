<script lang="ts">
	import { isJsonModalOpen, isMobile, isPreview, showLPane, showRPane } from '$lib/utils/flags.svelte';
	import createFormManager, { type FormManager } from '$lib/form/FormManager.svelte';
	import ElementsList from '$lib/ElementsList.svelte';
	import ElementEditor from '$lib/ElementEditor.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import JsonModal from '$lib/components/JsonModal.svelte';
	import Header from './components/Header.svelte';
	import Form from '$lib/form/Form.svelte';

	let activeElement = $state(null);

	const form: FormManager = createFormManager();

	let showL = $derived(!isPreview.state && showLPane.state);
	let showR = $derived(!isPreview.state && showRPane.state);

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

<Header bind:fields={form.fields} />

{#if isJsonModalOpen.state}
	<JsonModal content={form.fields} />
{/if}

<Splitpanes style="height: calc(100vh - 42px); justify-content: center;" horizontal={false} theme="custom-splitpanes-theme" pushOtherPanes={false}>
	{#if showL}
		<Pane size={30} minSize={25}>
			<div class="h-full p-1 overflow-auto bg-slate-100/50">
				<ElementsList />
			</div>
		</Pane>
	{/if}
	<Pane size={100} minSize={100}>
		<div class="h-full overflow-auto p-1.5">
			<Form bind:activeElement {form} />
		</div>
	</Pane>
	{#if showR}
		<Pane size={30} minSize={25}>
			<div class="h-full p-1 overflow-auto bg-slate-100/50">
				<ElementEditor bind:activeElement />
			</div>
		</Pane>
	{/if}
</Splitpanes>
