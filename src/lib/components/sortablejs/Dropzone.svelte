<script lang="ts">
	import { generateRandomId, newFieldSequence } from '$lib/utils/helpers';
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { SORTABLEJS } from '$lib/utils/enums';
	import { isDragging } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import { onMount } from 'svelte';
	import elements from '$lib/components/elements';
	import { ELEMENT_TYPES } from '$lib/utils/enums';
	import clone from 'clone';

	type Props = {
		formfield: (field: any, isSorting: boolean) => any;
	};

	let { formfield }: Props = $props();

	let element: HTMLElement;
	let sorting = $state();

	// Assign new properties to the new field
	const prepareField = (type: string): any => {
		let newField = clone(elements.find((f) => f.type === type));
		delete newField.component;
		// Assign unique id to the new field
		newField.id = `${newField.type}-${generateRandomId()}`;
		// Only generate label and name for form fields not for UI/Container elements
		if (newField.category === ELEMENT_TYPES.FORMFIELDS) {
			return newFieldSequence(form.fields, newField);
		}
		return newField;
	};

	onMount(() => {
		const sortable = new Sortable(element, {
			group: SORTABLEJS.GROUPNAME,
			animation: 200,
			handle: '.handle',
			onStart(event: SortableEvent) {
				const { item } = event;
				isDragging.state = true;
				sorting = item.dataset.fieldid;
			},
			onAdd(event: SortableEvent) {
				const { newIndex } = event;
				const field = prepareField(event.item.dataset.type);
				form.fields = [...form.fields.slice(0, newIndex), field, ...form.fields.slice(newIndex)];
				form.activeElement = form.fields[newIndex];
			},
			onRemove(event: SortableEvent) {
				const { oldDraggableIndex } = event;
				form.fields = form.fields.filter((_, index) => index !== oldDraggableIndex);
			},
			onUpdate(event: SortableEvent) {
				const { oldIndex, newIndex } = event;
				const movedElement = form.fields.splice(oldIndex, 1)[0];
				form.fields.splice(newIndex, 0, movedElement);
			},
			onEnd() {
				isDragging.state = false;
				sorting = null;
			}
		});
		return () => sortable?.destroy();
	});
</script>

<div bind:this={element} class="relative flex flex-col space-y-1.5 min-h-10 p-1.5" data-testid="dropzone">
	{#each form.fields as field (field.id)}
		{#key field.id}
			{@const isSorting = field.id === sorting}
			{@render formfield(field, isSorting)}
		{/key}
	{/each}
</div>
