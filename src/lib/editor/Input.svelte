<script lang="ts">
	import { form } from '$lib/stores/form.svelte';

	let { settingFieldName, section }: { settingFieldName: any; section: any } = $props();

	function handleValueChange(e: Event): void {
		const target = e.target as HTMLInputElement;
		form.activeElement.settings[section][settingFieldName] = target.value;
	}
</script>

<input
	type={form.activeElement.settings[section][settingFieldName]?.type}
	class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-none hover:border-slate-400 bg-white text-slate-700"
	value={form.activeElement.settings[section][settingFieldName]}
	oninput={handleValueChange}
/>
