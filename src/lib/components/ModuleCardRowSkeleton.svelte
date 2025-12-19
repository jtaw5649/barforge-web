<script lang="ts">
	import Skeleton from './Skeleton.svelte';
</script>

<div class="row-skeleton">
	<Skeleton variant="avatar" width="40px" height="40px" />
	<div class="main">
		<Skeleton variant="text" width="160px" height="1rem" />
		<Skeleton variant="text" width="80px" height="0.75rem" />
	</div>
	<Skeleton variant="button" width="70px" height="24px" />
	<Skeleton variant="text" width="50px" height="0.875rem" />
	<Skeleton variant="button" width="24px" height="24px" />
</div>

<style>
	.row-skeleton {
		display: grid;
		grid-template-columns: 40px 1fr auto auto auto;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-md) var(--space-lg);
		background: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.main {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	@media (max-width: 768px) {
		.row-skeleton {
			grid-template-columns: 40px 1fr auto auto;
		}

		.row-skeleton > :nth-child(3) {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.row-skeleton {
			grid-template-columns: 36px 1fr auto;
			gap: var(--space-sm);
			padding: var(--space-sm) var(--space-md);
		}

		.row-skeleton > :nth-child(3),
		.row-skeleton > :nth-child(4) {
			display: none;
		}
	}
</style>
