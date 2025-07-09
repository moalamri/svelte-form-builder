<script lang="ts">
	import DropIndicator from '$lib/components/form/DropIndicator.svelte';
	import { ELEMENT_TYPES, INSERT_MODE } from '$lib/utils/enums';
	import { isPreview } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import { elementClick } from '$lib/actions/elementClick';
	import Popover from '$lib/components/Popover.svelte';
	import { twMerge } from 'tailwind-merge';
	import { dndStore } from '$lib/stores/dnd.svelte';
	import autoAnimate from '@formkit/auto-animate';
	import { getFieldComponent } from '$lib/utils/form';
	import Empty from '$lib/components/form/Empty.svelte';

	// Components
	import Button from '$lib/components/Button.svelte';
	import Label from '$lib/components/elements/Label.svelte';
	import Icon from '@iconify/svelte';
	import { sortableElement } from '$lib/actions/sortableElement';

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
	class="relative border-slate-200 shadow-xs border rounded p-1 md:p-2 mb-1 select-none mx-auto"
	class:md:max-w-[80%]={isPreview.state}
>
	<div
		class={[
			'relative border rounded transition-all duration-200 border-transparent',
			dndStore.dropZoneReady && 'border-blue-200! bg-blue-50/50',
			dndStore.dropZoneActive && 'border-blue-400!'
		]}
		data-isdragging={dndStore.dropZoneActive}
		data-testid="form"
	>
		<div class="relative p-1.5 min-h-17 {form.fields.length === 0 && 'justify-center items-center'}" data-testid="dropzone" id="dropzone">
			<div class="relative flex flex-col gap-1" bind:clientWidth={dndStore.dropZoneWidth} use:autoAnimate={{ duration: 150 }}>
				<!-- Empty form -->
				<Empty />
				{#if dndStore.insertingMode() === INSERT_MODE.NEW}
					<DropIndicator />
				{/if}
				{#each form.fields as field, index (field.id)}
					{@const { Component } = getFieldComponent(field.type)}
					{@const isActive = form.activeElement && form.activeElement.id === field.id}
					{@const isSorting = dndStore.dragIndex === index}
					{@const show = dndStore.insertingMode(index) === INSERT_MODE.INSIDE}
					{@const isLast = dndStore.insertingMode(index) === INSERT_MODE.LAST}
					{#if show}
						<DropIndicator />
					{/if}
					<div
						class="relative bg-white"
						class:opacity-50={isSorting}
						data-testid="form-field-{field.type}"
						data-isactive={isActive}
						data-form-element={index}
						id={field.id}
						use:elementClick={() => (form.activeElement = field)}
					>
						{#if isSorting}
							<div class="absolute top-0 left-0 w-full h-full bg-blue-500/10 z-10 rounded-sm"></div>
						{/if}
						<div class="relative">
							<div
								class={twMerge(
									'relative flex rounded-sm border shadow-xs shadow-slate-200 hover:shadow-sm',
									isActive ? 'border-blue-600' : 'border-slate-200',
									isPreview.state && 'border-slate-50'
								)}
							>
								<div
									class="flex flex-col items-center border-e border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-s-sm p-1 gap-2 w-6"
									class:hidden={isPreview.state}
								>
									<div use:sortableElement={{ elementIndex: index, field, Component }}>
										<Icon icon="fluent:drag-24-regular" class="handle cursor-move text-slate-600" />
									</div>
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
								<div class="relative flex flex-col justify-center p-2 w-full rounded-e-sm">
									{#if field.category === ELEMENT_TYPES.FORMFIELDS}
										<Label {field} />
									{/if}
									<Component onchange={form.handleChange} {field} />
								</div>
							</div>
						</div>
					</div>
					{#if isLast}
						<DropIndicator />
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<div class="flex space-x-2 mt-2">
		<Button variant="primary">Submit</Button>
		<Button variant="secondary">Reset</Button>
	</div>
</form>
