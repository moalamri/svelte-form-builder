<script lang="ts">
	const {
		text = 'Button',
		type = 'submit',
		disabled = false,
		onclick = () => {}
	}: { text: string; type?: 'submit' | 'reset' | 'button'; disabled?: boolean; onclick?: () => void } = $props();

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		onclick();
	};
</script>

<button {type} {disabled} onclick={handleClick} class="hover:bg-blue-950 rounded-md bg-blue-900 p-1 text-center text-white outline-none w-20">
	{text}
</button>
