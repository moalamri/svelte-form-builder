<script lang="ts">
	const { active, position } = $props();
</script>

<div class="absolute flex items-center justify-center w-full h-1.5 z-10 left-0 {position === 'before' ? 'top-[-3px]' : 'bottom-[-3px]'}">
	{#if active}
		<div class="bg-blue-500 size-[5px] rounded-full"></div>
		<div class="bg-blue-500/60 w-full h-0.5"></div>
		<div class="bg-blue-500 size-[5px] rounded-full"></div>
	{/if}
</div>
