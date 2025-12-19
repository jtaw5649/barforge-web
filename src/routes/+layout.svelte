<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Toast from '$lib/components/Toast.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>Waybar Modules Marketplace</title>
</svelte:head>

<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="app-wrapper">
	{@render children()}
</div>
<Toast />

<style>
	.app-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.app-wrapper :global(main) {
		flex: 1;
	}

	.app-wrapper :global(footer) {
		margin-top: auto;
	}
</style>
