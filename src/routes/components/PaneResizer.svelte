<script lang="ts">
	const { isActive } = $props();
</script>

<div
	class:bg-blue-600={isActive}
	class:w-[3px]={isActive}
	class="relative w-0.5 bg-slate-200 hover:bg-slate-300 flex justify-center items-center h-full transition-colors duration-100 ease-linear"
></div>
