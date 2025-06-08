<script lang="ts">
	const { isActive } = $props();
</script>

<div
	class={[
		'relative w-0.5 flex justify-center items-center h-full transition-colors duration-100 ease-linear',
		isActive ? 'bg-blue-700/50' : 'bg-slate-200 hover:bg-slate-300'
	]}
></div>
