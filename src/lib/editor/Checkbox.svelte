<script lang="ts">
	import Icon from '@iconify/svelte';

	let { activeElement = $bindable(), settingField, section }: { activeElement: any; settingField: any; section: any } = $props();

	function handleValueChange(e: Event): void {
		activeElement.settings[section][settingField.name] = !activeElement.settings[section][settingField.name];
	}
</script>

<button type="button" onclick={handleValueChange} class="flex justify-end outline-none w-full">
	<Icon
		icon={activeElement.settings[section][settingField.name] === true ? 'fluent:checkbox-checked-20-regular' : 'fluent:checkbox-unchecked-20-regular'}
		class="w-5 h-5 {activeElement.settings[section][settingField.name] === true ? 'text-blue-600' : 'text-slate-500'}"
	/>
</button>
