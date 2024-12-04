<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	type Props = {
		text: string;
		disabled?: boolean;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
		class?: string;
		onclick?: () => void;
	};

	let { text = 'Button', disabled = false, size = 'md', variant = 'primary', class: cls = '', onclick = () => {} }: Props = $props();

	const defaultClass = 'rounded text-center outline-none min-w-20';
	const sizeClass =
		variant === 'ghost' ? '' : size === 'xs' ? 'py-0.5 px-1' : size === 'sm' ? 'py-1 px-1.5' : size === 'md' ? 'py-1 px-2' : 'py-1.5 px-3';
	const textSizeClass = size === 'lg' ? 'text-base' : size === 'xs' || size === 'sm' ? 'text-xs' : 'text-sm';
	const variantClass =
		variant === 'primary'
			? 'bg-blue-900 hover:bg-blue-950 text-white'
			: variant === 'secondary'
				? 'bg-slate-200/70 hover:bg-slate-200 text-slate-700'
				: variant === 'danger'
					? 'bg-red-700 hover:bg-red-800 text-white'
					: 'bg-transparent hover:bg-slate-200';

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onclick();
	};

	const buttonClass = twMerge(defaultClass, sizeClass, textSizeClass, variantClass, cls);
</script>

<button {disabled} onclick={handleClick} class={buttonClass}>{text}</button>
