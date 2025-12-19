<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import Toast from '$lib/components/Toast.svelte';
	import { focusSearchInput } from '$lib/stores/search';

	let { children }: { children: Snippet } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			focusSearchInput();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

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
