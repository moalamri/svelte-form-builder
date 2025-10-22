<script lang="ts">
	type Props = {
		elements: any[] | any;
		title: string;
		dragComponent: any;
	};

	let { elements, title, dragComponent }: Props = $props();
</script>

<div class="flex flex-col w-full space-y-2">
	<div class="bg-slate-400/10 py-1.5 px-2 rounded-xs">
		<p class="text-xs font-semibold text-slate-700">{title}</p>
	</div>
	<div class="lg:grid lg:grid-cols-3 flex flex-col gap-4 select-none">
		{#each elements as element (element.id)}
			{@render dragComponent(element)}
		{/each}
	</div>
</div>
