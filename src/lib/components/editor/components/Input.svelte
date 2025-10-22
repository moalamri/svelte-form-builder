<script lang="ts">
	import form from '$lib/stores/form.svelte';

	let { settingFieldName, section, index }: { settingFieldName: any; section: any; index?: number } = $props();

	const value = $derived(
		index !== undefined ? form.activeElement.settings[section][index][settingFieldName] : form.activeElement.settings[section][settingFieldName]
	);

	function handleValueChange(e: Event): void {
		const newValue = (e.target as HTMLInputElement).value;
		form.handleSettingChange(form.activeElement.id, newValue, section, settingFieldName, index);
	}
</script>

<input
	class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
	{value}
	oninput={handleValueChange}
/>
