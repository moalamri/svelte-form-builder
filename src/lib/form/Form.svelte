<script lang="ts">
	import { cloner, newFieldSequence, generateRandomId } from '$lib/utils/helpers';
	import { ELEMENT_TYPES, SORTABLEJS } from '$lib/utils/enums';
	import { isPreview, isDragging } from '$lib/utils/flags.svelte';
	import { type Options, type SortableEvent } from 'sortablejs';
	import { type FormManager } from './FormManager.svelte';
	import { elementClick } from '$lib/utils/actions';
	import elements from '$lib/elements';
	import { slide } from 'svelte/transition';
	import type { Component } from 'svelte';

	// Components
	import Button from '$lib/components/Button.svelte';
	import Dropzone from '$lib/sortablejs/Dropzone.svelte';
	import Label from '$lib/elements/Label.svelte';
	import Icon from '@iconify/svelte';

	// Props
	let { activeElement = $bindable(), form }: { activeElement: any; form: FormManager } = $props();

	// Assign new properties to the new field
	const prepareField = (type: string): any => {
		let newField = cloner(elements.find((f) => f.type === type));
		delete newField.component;
		// Assign unique id to the new field
		newField.id = `${newField.type}-${generateRandomId()}`;
		// Only generate label and name for form fields not for UI/Container elements
		if (newField.category === ELEMENT_TYPES.FORMFIELDS) {
			return newFieldSequence(form.fields, newField);
		}
		return newField;
	};

	const getFieldComponent = (type: string): Component => {
		const field = elements.find((f) => f.type === type);
		return field.component.render;
	};

	const submitBtn = {
		text: 'Submit'
	};
	const resetBtn = {
		text: 'Reset'
	};

	// Inspect and log form changes
	$inspect(form).with(console.log);

	// Submit form.
	const onSubmit = async (e: Event): Promise<void> => {
		e.preventDefault();
	};

	// Reset form.
	const onReset = async (e: Event): Promise<void> => {
		e.preventDefault();
	};

	// Set active field.
	const setActiveElement = (field): void => {
		activeElement = field;
	};

	// Remove field.
	const removeField = (fieldId: string): void => {
		if (activeElement) {
			activeElement = null;
		}
		form.fields = form.fields.filter((f) => f.id !== fieldId);
	};

	const dropzoneOptions: Options = {
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
			setActiveElement(field);
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
	};
</script>

<form
	onsubmit={onSubmit}
	onreset={onReset}
	class="border-slate-200 shadow-sm border rounded-sm p-1 md:p-2 mb-1 select-none mx-auto"
	class:md:max-w-[80%]={isPreview.state}
>
	<div class="p-2 border {isDragging.state ? 'shadow-inner rounded-sm bg-yellow-100/20' : 'border-transparent'}">
		<!-- Empty form -->
		{#if form.fields.length === 0}
			<div class="flex items-center justify-center">
				<p class="text-sm text-slate-700 -mb-10">Drag and drop fields here</p>
			</div>
		{/if}
		<Dropzone fields={form.fields} options={dropzoneOptions}>
			{#snippet formfield(field)}
				{@const FormComponent = getFieldComponent(field.type)}
				{@const isActive = activeElement && activeElement.id === field.id}
				<div
					class:border={!isPreview.state}
					class:shadow-sm={!isPreview.state}
					class="flex {isActive ? 'border-blue-600' : 'border-slate-300'} rounded-sm"
					data-fieldid={field.id}
					use:elementClick={() => setActiveElement(field)}
				>
					{#if !isPreview.state}
						<div
							class="flex flex-col border-e border-slate-300 bg-slate-50/50 hover:bg-slate-100 rounded-sm p-1 space-y-2"
							transition:slide={{ axis: 'x', duration: 100 }}
						>
							<Icon icon="fluent:drag-24-regular" class="handle cursor-move text-slate-600" />
							<button type="button" onclick={() => removeField(field.id)}>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-slate-600" />
							</button>
						</div>
					{/if}
					<div class="relative flex flex-col justify-center p-2 w-full bg-white">
						{#if field.category === ELEMENT_TYPES.FORMFIELDS}
							<Label {field} />
						{/if}
						<FormComponent {field} updator={form.updator} />
					</div>
				</div>
			{/snippet}
		</Dropzone>
	</div>
	<div class="flex space-x-2 mt-2">
		<Button type="submit" text={submitBtn.text} />
		<Button type="reset" text={resetBtn.text} />
	</div>
</form>
