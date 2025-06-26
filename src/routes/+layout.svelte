<script lang="ts">
	import '../app.css';
	import { isMobile } from '$lib/stores/flags.svelte';
	import nightOwl from 'svelte-highlight/styles/night-owl';

	let { children } = $props();

	let innerWidth: number = $state(null);

	function processWidth(w: number) {
		isMobile.state = w < 768;
	}

	$effect(() => innerWidth && processWidth(innerWidth));
</script>

<svelte:window bind:innerWidth />
<svelte:head>
	{@html nightOwl}
</svelte:head>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
