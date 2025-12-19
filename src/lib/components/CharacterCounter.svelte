<script lang="ts">
	import { getCharacterCounterState } from '$lib/utils/characterCounter';

	interface Props {
		current: number;
		max: number;
	}

	let { current, max }: Props = $props();

	const counterState = $derived(getCharacterCounterState(current, max));
</script>

<span
	class="character-counter"
	class:warning={counterState.state === 'warning'}
	class:error={counterState.state === 'error'}
	aria-live="polite"
	aria-atomic="true"
>
	{counterState.display}
</span>

<style>
	.character-counter {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.character-counter.warning {
		color: var(--color-warning, #f59e0b);
	}

	.character-counter.error {
		color: var(--color-error);
		font-weight: 500;
	}
</style>
