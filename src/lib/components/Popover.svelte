<script lang="ts">
	import { machine, connect, type Props } from '@zag-js/popover';
	import { portal, useMachine, normalizeProps } from '@zag-js/svelte';
	import { twMerge } from 'tailwind-merge';
	import type { Snippet } from 'svelte';

	type PopoverProps = {
		title?: string;
		description?: string;
		children: Snippet;
		trigger: Snippet;
		class?: string;
	} & Partial<Props>;

	let { title, description, children, trigger, class: cls, ...rest }: PopoverProps = $props();

	const defaultClass = 'bg-white rounded-sm border border-slate-400 shadow-xs text-sm px-2 z-50';
	const contentClass = twMerge(defaultClass, cls);

	const id = $props.id();
	const service = useMachine(machine, {
		id,
		positioning: {
			placement: 'top'
		}
	});
	const api = $derived(connect(service, normalizeProps));
</script>

<button {...api.getTriggerProps()}>{@render trigger()}</button>
<div use:portal={{ disabled: !api.portalled }} {...api.getPositionerProps()} {...rest}>
	<div {...api.getContentProps()} class={contentClass}>
		{#if title}
			<div {...api.getTitleProps()} class="text-slate-800 font-semibold p-2">{title}</div>
		{/if}
		{#if description}
			<div {...api.getDescriptionProps()} class="text-slate-700">{description}</div>
		{/if}
		{@render children()}
	</div>
</div>
