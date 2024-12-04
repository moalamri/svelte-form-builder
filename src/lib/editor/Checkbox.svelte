<script lang="ts">
	import Icon from '@iconify/svelte';
	import { form } from '$lib/stores/form.svelte';

	let { settingFieldName, section }: { settingFieldName: any; section: any } = $props();

	function handleValueChange(e: Event): void {
		form.activeElement.settings[section][settingFieldName] = !form.activeElement.settings[section][settingFieldName];
	}
</script>

<button type="button" onclick={handleValueChange} class="flex justify-end outline-none w-full">
	<Icon
		icon={form.activeElement.settings[section][settingFieldName] === true
			? 'fluent:checkbox-checked-20-regular'
			: 'fluent:checkbox-unchecked-20-regular'}
		class="w-5 h-5 {form.activeElement.settings[section][settingFieldName] === true ? 'text-blue-600' : 'text-slate-500'}"
	/>
</button>
