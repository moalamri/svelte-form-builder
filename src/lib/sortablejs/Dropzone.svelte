<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';
	import { SORTABLEJS } from '$lib/utils/enums';
	import { isDragging } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import { onMount } from 'svelte';
	import elements from '$lib/elements';
	import { generateRandomId } from '$lib/utils/helpers';
	import { ELEMENT_TYPES } from '$lib/utils/enums';
	import clone from 'clone'
	import { newFieldSequence } from '$lib/utils/helpers';

	let { fields = $bindable(), formfield }: { fields: any[]; formfield: any } = $props();

	let element: HTMLElement;

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
			animation: 150,
			handle: '.handle',
			onStart() {
				isDragging.state = true;
			},
			onAdd(event: SortableEvent) {
				const field = prepareField(event.item.dataset.type);
				const { newIndex } = event;
				form.fields = [...form.fields.slice(0, newIndex), field, ...form.fields.slice(newIndex)];
				form.activeElement = form.fields[newIndex];
			},
			onRemove(event: SortableEvent) {
				const { oldDraggableIndex } = event;
				form.fields = form.fields.filter((_, index) => index !== oldDraggableIndex);
			},
			onUpdate(event: SortableEvent) {
				const currFields = [...form.fields];
				const { oldIndex, newIndex } = event;
				const movedElement = currFields.splice(oldIndex, 1)[0];
				currFields.splice(newIndex, 0, movedElement);
				form.fields = currFields;
			},
			onEnd() {
				isDragging.state = false;
			}
		});
		return () => sortable?.destroy();
	});
</script>

<div bind:this={element} class="flex flex-col space-y-1.5 min-h-10">
	{#each fields as field (field.id)}
		{@render formfield(field)}
	{/each}
</div>
