<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'purple' | 'blue' | 'green' | 'amber' | 'pink' | 'gray' | 'teal';

	interface Props {
		variant?: Variant;
		children?: Snippet;
	}

	let { variant = 'gray', children }: Props = $props();
</script>

<span class="tag tag-{variant}">
	{@render children?.()}
</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 9999px;
		font-size: 0.6875rem;
		font-weight: 500;
		white-space: nowrap;
		letter-spacing: 0.01em;
	}

	.tag :global(svg) {
		width: 12px;
		height: 12px;
		flex-shrink: 0;
	}

	.tag-purple {
		background: rgba(139, 92, 246, 0.15);
		color: #a78bfa;
	}

	.tag-blue {
		background: rgba(59, 130, 246, 0.15);
		color: #60a5fa;
	}

	.tag-green {
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
	}

	.tag-amber {
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
	}

	.tag-pink {
		background: rgba(236, 72, 153, 0.15);
		color: #f472b6;
	}

	.tag-gray {
		background: rgba(156, 163, 175, 0.15);
		color: #9ca3af;
	}

	.tag-teal {
		background: rgba(20, 184, 166, 0.15);
		color: #2dd4bf;
	}
</style>
