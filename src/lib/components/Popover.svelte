<script lang="ts">
	import { Popover } from 'ui-ingredients';
	import type { PopoverProps } from 'ui-ingredients';
	import { Portal } from 'ui-ingredients';
	import { twMerge } from 'tailwind-merge';

	type Props = { title?: string; description?: string; children: any; trigger: any; class?: string } & PopoverProps;

	let { title, description, children, trigger, class: cls, ...rest }: Props = $props();

	const defaultClass = 'bg-white rounded border border-slate-400 shadow-sm text-sm z-50';
	const contentClass = twMerge(defaultClass, cls);
</script>

<Popover.Root {...rest}>
	<Popover.Trigger>{@render trigger()}</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content class={contentClass}>
				<div class:p-2={!!title || !!description}>
					{#if title}
						<Popover.Title class="text-slate-800 font-semibold">{title}</Popover.Title>
					{/if}
					{#if description}
						<Popover.Description class="text-slate-700">{description}</Popover.Description>
					{/if}
				</div>
				{@render children()}
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover.Root>
