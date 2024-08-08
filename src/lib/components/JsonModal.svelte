<script lang="ts">
	import { isJsonModalOpen } from '$lib/utils/flags.svelte';
	import Button from '$lib/components/Button.svelte';
	import json from 'svelte-highlight/languages/json';
	import Highlight from 'svelte-highlight';
	import Icon from '@iconify/svelte';
	const { content } = $props();
</script>

<div
	class="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300"
>
	<div class="relative m-4 w-2/5 min-w-[90%] rounded-lg bg-white antialiased shadow-2xl">
		<div class="flex items-center border-b border-b-slate-400 justify-between p-2 text-md font-semibold">
			<p class="text-blue-950">Form JSON</p>
			<button class="p-1 rounded-md hover:bg-slate-300 bg-slate-200" onclick={() => (isJsonModalOpen.state = false)}>
				<Icon icon="ph:x" class="size-5" />
			</button>
		</div>
		<div class="text-sm relative p-1 antialiased overflow-auto max-h-[65vh] bg-slate-900">
			<Highlight language={json} code={JSON.stringify(content, null, 2)} />
		</div>
		<div class="flex justify-end border-t border-t-slate-400 p-2">
			<Button text="COPY" onclick={() => navigator.clipboard.writeText(JSON.stringify(content, null, 2))} />
		</div>
	</div>
</div>
