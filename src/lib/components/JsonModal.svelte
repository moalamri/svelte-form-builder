<script lang="ts">
	import { isJsonModalOpen } from '$lib/stores/flags.svelte';
	import form from '$lib/stores/form.svelte';
	import Button from '$lib/components/Button.svelte';
	import json from 'svelte-highlight/languages/json';
	import Highlight from 'svelte-highlight';
	import Icon from '@iconify/svelte';
</script>

<div
	class="fixed flex justify-center items-center top-0 start-0 md:inset-0 z-999 size-full bg-black/60 backdrop-blur-xs transition-opacity duration-300"
>
	<div class="absolute max-h-dvh w-full md:max-w-4xl rounded-lg bg-white antialiased shadow-2xl">
		<div class="flex items-center border-b border-b-slate-400 justify-between p-2 text-md font-semibold">
			<p class="text-blue-950">Form JSON</p>
			<button class="p-1 rounded-md hover:bg-slate-300 bg-slate-200" onclick={() => (isJsonModalOpen.state = false)}>
				<Icon icon="ph:x" class="size-5" />
			</button>
		</div>
		<div class="text-sm relative p-1 antialiased overflow-auto max-h-[65vh] bg-slate-900">
			<Highlight language={json} code={JSON.stringify(form.fields, null, 2)} />
		</div>
		<div class="flex justify-end border-t border-t-slate-400 p-2">
			<Button onclick={() => navigator.clipboard.writeText(JSON.stringify(form.fields, null, 2))}>COPY</Button>
		</div>
	</div>
</div>
