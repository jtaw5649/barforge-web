<script lang="ts">
	import Skeleton from './Skeleton.svelte';
</script>

<div class="card-skeleton">
	<div class="badges">
		<Skeleton variant="button" width="60px" height="20px" />
	</div>

	<div class="content">
		<Skeleton variant="avatar" width="48px" height="48px" />
		<div class="main">
			<div class="header">
				<Skeleton variant="text" width="140px" height="1.125rem" />
				<Skeleton variant="button" width="40px" height="18px" />
			</div>
			<Skeleton variant="text" width="80px" height="0.8rem" />
			<div class="description">
				<Skeleton variant="text" width="100%" height="0.875rem" />
				<Skeleton variant="text" width="75%" height="0.875rem" />
			</div>
		</div>
	</div>

	<div class="footer">
		<Skeleton variant="text" width="100px" height="0.75rem" />
		<Skeleton variant="button" width="32px" height="32px" />
	</div>
</div>

<style>
	.card-skeleton {
		padding: var(--space-lg);
		background: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
	}

	.badges {
		margin-bottom: var(--space-md);
	}

	.content {
		display: flex;
		gap: var(--space-md);
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.header {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.description {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-top: var(--space-xs);
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid var(--color-border);
	}
</style>
