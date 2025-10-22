<script lang="ts">
	import Draggable from '$lib/components/zone/Dragzone.svelte';
	import ElementCard from '$lib/components/elements/ElementCard.svelte';
	import elements from '$lib/components/elements';
	import Icon from '@iconify/svelte';
	import { ELEMENT_TYPES } from '$lib/utils/enums';
	import { getByElementTypes } from '$lib/utils/helpers';

	const fields = getByElementTypes(elements, ELEMENT_TYPES.FORMFIELDS);
	const uiElements = getByElementTypes(elements, ELEMENT_TYPES.UI);
	const containers = getByElementTypes(elements, ELEMENT_TYPES.CONTAINERS);
</script>

<div class="flex flex-col w-full h-full space-y-1">
	<div class="flex space-x-1 items-center py-1">
		<Icon icon="ci:main-component" class="size-0 md:size-4 text-slate-500" />
		<p class="text-sm md:text-md font-semibold text-slate-800">Elements</p>
	</div>
	<div class="flex flex-col space-y-2" data-testid="elements-list">
		<Draggable elements={fields} title="Form Fields">
			{#snippet dragComponent(element)}
				<ElementCard {element} />
			{/snippet}
		</Draggable>
		<Draggable elements={uiElements} title="UI">
			{#snippet dragComponent(element)}
				<ElementCard {element} />
			{/snippet}
		</Draggable>
		{#if containers.length > 0}
			<Draggable elements={containers} title="Containers">
				{#snippet dragComponent(element)}
					<ElementCard {element} />
				{/snippet}
			</Draggable>
		{/if}
	</div>
</div>
