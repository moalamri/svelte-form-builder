<script lang="ts">
	let { activeElement = $bindable(), settingField, section }: { activeElement: any; settingField: any; section: any } = $props();

	function handleValueChange(e: Event): void {
		const target = e.target as HTMLInputElement;
		activeElement.settings[section][settingField.name] = target.value;
	}
</script>

<input
	type={settingField.type}
	class="w-full py-0.5 px-1 m-0 text-sm rounded-md border border-slate-300 focus:border-blue-600 focus:outline-none hover:border-slate-400 bg-white text-slate-700"
	value={activeElement.settings[section][settingField.name]}
	oninput={handleValueChange}
/>
