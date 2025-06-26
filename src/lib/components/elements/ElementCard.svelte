<script lang="ts">
	import Icon from '@iconify/svelte';
	import { draggableElement } from '$lib/actions/dnd';

	const { element }: { element: any } = $props();
</script>

<div
	class="transition-all rounded-md box-border shadow-xs border border-blue-800/20 bg-white cursor-grab"
	data-type={element.type}
	data-testid="element-{element.type}"
	use:draggableElement={{ type: element.type }}
>
	<div class="flex flex-col items-center p-0.5">
		<div class="size-7 bg-blue-800/5 rounded-md p-0.5">
			<Icon icon={element.component.icon} class="size-6 text-blue-800" />
		</div>
		<span class="text-[0.7rem] text-slate-700">{element.component.title}</span>
	</div>
</div>
