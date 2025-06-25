<script lang="ts">
	import { ELEMENT_TYPES } from '$lib/utils/enums';
	import { isPreview, isDragging } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import { elementClick } from '$lib/actions/elementClick';
	import { slide } from 'svelte/transition';
	import type { Component } from 'svelte';
	import Popover from '$lib/components/Popover.svelte';
	import elements from '$lib/components/elements';
	import { twMerge } from 'tailwind-merge';

	// Components
	import Button from '$lib/components/Button.svelte';
	import Dropzone from '$lib/components/sortablejs/Dropzone.svelte';
	import Label from '$lib/components/elements/Label.svelte';
	import Icon from '@iconify/svelte';

	const getFieldComponent = (type: string): Component => {
		const field = elements.find((f) => f.type === type);
		return field.component.render;
	};

	// Inspect and log form changes
	$inspect(form.fields);

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
	<div
		class={['relative border', isDragging.state ? 'border-blue-200 rounded-sm bg-blue-50/50' : 'border-transparent']}
		data-isdragging={isDragging.state}
		data-testid="form"
	>
		<!-- Empty form -->
		{#if form.fields.length === 0}
			<div class="flex items-center justify-center">
				<p class="text-sm text-slate-700 -mb-10">Drag and drop fields here</p>
			</div>
		{/if}
		<Dropzone>
			{#snippet formfield(field, isSorting)}
				{@const FormComponent = getFieldComponent(field.type)}
				{@const isActive = form.activeElement && form.activeElement.id === field.id}
				<div
					class="relative {isSorting && 'ring-2 ring-blue-600/80 rounded-sm'}"
					data-fieldid={field.id}
					data-testid="form-field-{field.type}"
					data-isactive={isActive.toString()}
					id={field.id}
					use:elementClick={() => (form.activeElement = field)}
				>
					<div
						class={twMerge(
							'relative flex rounded-sm border shadow-xs shadow-slate-200 hover:shadow-sm bg-white',
							isActive ? 'border-blue-600' : 'border-slate-200',
							isPreview.state && 'border-slate-50',
							isSorting && 'opacity-0'
						)}
					>
						<div
							class="flex flex-col items-center border-e border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-s-sm p-1 gap-2 w-6"
							class:hidden={isPreview.state}
							transition:slide={{ axis: 'x', duration: 100 }}
						>
							<Icon icon="fluent:drag-24-regular" class="handle cursor-move text-slate-600" />
							<Popover positioning={{ placement: 'top' }} portalled={true} class="bg-slate-900/60 backdrop-blur-xs">
								{#snippet trigger()}
									<button type="button" data-testid="delete-button">
										<Icon icon="material-symbols:delete-outline-rounded" class="text-slate-600" />
									</button>
								{/snippet}
								<div class="flex items-center space-x-2 p-1" data-testid="delete-popover">
									<p class="text-white text-xs leading-none">Remove this field?</p>
									<Button size="sm" class="min-w-10" onclick={() => removeField(field.id)} variant="danger" data-testid="delete-button-yes"
										>Yes</Button
									>
								</div>
							</Popover>
						</div>
						<div class="relative flex flex-col justify-center p-2 w-full bg-white rounded-e-sm">
							{#if field.category === ELEMENT_TYPES.FORMFIELDS}
								<Label {field} />
							{/if}
							<FormComponent {field} updator={form.updator} />
						</div>
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
