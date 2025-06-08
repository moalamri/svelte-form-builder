<script lang="ts">
	import { ELEMENT_TYPES } from '$lib/utils/enums';
	import { isPreview, isDragging } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import { elementClick } from '$lib/utils/actions';
	import { slide } from 'svelte/transition';
	import type { Component } from 'svelte';
	import Popover from '$lib/components/Popover.svelte';
	import elements from '$lib/elements';

	// Components
	import Button from '$lib/components/Button.svelte';
	import Dropzone from '$lib/sortablejs/Dropzone.svelte';
	import Label from '$lib/elements/Label.svelte';
	import Icon from '@iconify/svelte';

	const getFieldComponent = (type: string): Component => {
		const field = elements.find((f) => f.type === type);
		return field.component.render;
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

	// Remove field.
	const removeField = (fieldId: string): void => {
		form.activeElement = null;
		form.fields = form.fields.filter((f) => f.id !== fieldId);
	};
</script>

<form
	onsubmit={onSubmit}
	onreset={onReset}
	class="relative border-slate-200 shadow-xs border rounded-xs p-1 md:p-2 mb-1 select-none mx-auto"
	class:md:max-w-[80%]={isPreview.state}
>
	<div class="relative p-2 border {isDragging.state ? 'shadow-inner rounded-xs bg-yellow-100/20' : 'border-transparent'}">
		<!-- Empty form -->
		{#if form.fields.length === 0}
			<div class="flex items-center justify-center">
				<p class="text-sm text-slate-700 -mb-10">Drag and drop fields here</p>
			</div>
		{/if}
		<Dropzone fields={form.fields}>
			{#snippet formfield(field)}
				{@const FormComponent = getFieldComponent(field.type)}
				{@const isActive = form.activeElement && form.activeElement.id === field.id}
				<div
					class:border={!isPreview.state}
					class:shadow-sm={!isPreview.state}
					class="relative flex {isActive ? 'border-blue-600' : 'border-slate-200'} rounded-xs"
					data-fieldid={field.id}
					use:elementClick={() => (form.activeElement = field)}
				>
					<div
						class="flex flex-col border-e border-slate-300 bg-slate-50/50 hover:bg-slate-100 rounded-xs p-1 gap-2"
						class:hidden={isPreview.state}
						transition:slide={{ axis: 'x', duration: 100 }}
					>
						<Icon icon="fluent:drag-24-regular" class="handle cursor-move text-slate-600" />
						<Popover positioning={{ placement: 'top' }} portalled={true} class="bg-slate-900/60 backdrop-blur-xs">
							{#snippet trigger()}
								<Icon icon="material-symbols:delete-outline-rounded" class="text-slate-600" />
							{/snippet}
							<div class="flex items-center space-x-2 p-1">
								<p class="text-white text-xs leading-none">Remove this field?</p>
								<Button size="sm" class="min-w-10" onclick={() => removeField(field.id)} variant="danger">Yes</Button>
							</div>
						</Popover>
					</div>
					<div class="relative flex flex-col justify-center p-2 w-full bg-white rounded-xs">
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
		<Button variant="primary">Submit</Button>
		<Button variant="secondary">Reset</Button>
	</div>
</form>
