<script lang="ts">
	const { field }: { field: any } = $props();
</script>

<div class="relative flex items-center w-full">
	<input
		placeholder={field.settings.attributes.placeholder}
		name={field.settings.properties.name}
		class="w-full py-1 px-2 m-0 text-sm md:text-base rounded-md border border-slate-300 focus:border-blue-600 focus:outline-hidden hover:border-slate-400 bg-white text-slate-700"
		type={field.settings.attributes.type}
	/>
</div>
