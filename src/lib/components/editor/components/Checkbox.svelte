<script lang="ts">
	import Icon from '@iconify/svelte';

	let { value, onchange }: { value: any; onchange: any } = $props();
</script>

<button type="button" onclick={onchange} class="flex justify-end outline-hidden w-full">
	<Icon
		icon={value === true ? 'fluent:checkbox-checked-20-regular' : 'fluent:checkbox-unchecked-20-regular'}
		class="w-5 h-5 {value === true ? 'text-blue-600' : 'text-slate-500'}"
	/>
</button>
