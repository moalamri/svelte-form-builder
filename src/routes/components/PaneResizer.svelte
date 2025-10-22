<script lang="ts">
	const { ...rest } = $props();
</script>

<div
	class={'w-[3px] transition-colors duration-100 ease-linear bg-slate-200 outline-blue-700/50 active:outline active:bg-blue-700/50'}
	{...rest}
></div>
