<script lang="ts">
	import form from '$lib/stores/form.svelte';
	import Icon from '@iconify/svelte';

	let { settingFieldName, section, index }: { settingFieldName: any; section: any; index?: number } = $props();

	const value = $derived(
		index !== undefined ? form.activeElement.settings[section][index][settingFieldName] : form.activeElement.settings[section][settingFieldName]
	);

	function handleValueChange(_: Event): void {
		form.handleSettingChange(form.activeElement.id, !value, section, settingFieldName, index);
	}
</script>

<button type="button" onclick={handleValueChange} class="flex justify-end outline-hidden w-full">
	<Icon
		icon={value === true ? 'fluent:checkbox-checked-20-regular' : 'fluent:checkbox-unchecked-20-regular'}
		class="w-5 h-5 {value === true ? 'text-blue-600' : 'text-slate-500'}"
	/>
</button>
