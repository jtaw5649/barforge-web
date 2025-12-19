<script lang="ts">
	import { API_BASE_URL } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	interface Submission {
		id: number;
		submitter_id: number;
		uuid: string;
		name: string;
		description: string;
		category: string;
		version: string;
		repo_url: string;
		status: string;
		submitted_at: string;
		submitter_username: string;
	}

	interface AdminStats {
		total_modules: number;
		total_users: number;
		total_downloads: number;
		pending_submissions: number;
	}

	let submissions: Submission[] = $state([]);
	let stats: AdminStats | null = $state(null);
	let loading = $state(true);
	let error: string | null = $state(null);
	let actionLoading: number | null = $state(null);
	let rejectReason = $state('');
	let showRejectModal: number | null = $state(null);

	$effect(() => {
		if (data.session?.user) {
			fetchAdminData();
		} else {
			loading = false;
		}
	});

	async function fetchAdminData() {
		try {
			const [submissionsRes, statsRes] = await Promise.all([
				fetch(`${API_BASE_URL}/api/v1/admin/submissions`, { credentials: 'include' }),
				fetch(`${API_BASE_URL}/api/v1/admin/stats`, { credentials: 'include' })
			]);

			if (submissionsRes.status === 403 || statsRes.status === 403) {
				error = 'Access denied. Moderator or admin role required.';
				return;
			}

			if (!submissionsRes.ok || !statsRes.ok) {
				throw new Error('Failed to fetch admin data');
			}

			const submissionsData = await submissionsRes.json();
			const statsData = await statsRes.json();

			submissions = submissionsData.data || [];
			stats = statsData.data || null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			loading = false;
		}
	}

	async function approveSubmission(id: number) {
		actionLoading = id;
		try {
			const res = await fetch(`${API_BASE_URL}/api/v1/admin/submissions/${id}/approve`, {
				method: 'POST',
				credentials: 'include'
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || 'Failed to approve submission');
			}

			submissions = submissions.filter((s) => s.id !== id);
			if (stats) stats.pending_submissions--;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			actionLoading = null;
		}
	}

	async function rejectSubmission(id: number) {
		if (!rejectReason.trim()) {
			error = 'Please provide a rejection reason';
			return;
		}

		actionLoading = id;
		try {
			const res = await fetch(`${API_BASE_URL}/api/v1/admin/submissions/${id}/reject`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ reason: rejectReason })
			});

			if (!res.ok) {
				const text = await res.text();
				throw new Error(text || 'Failed to reject submission');
			}

			submissions = submissions.filter((s) => s.id !== id);
			if (stats) stats.pending_submissions--;
			showRejectModal = null;
			rejectReason = '';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			actionLoading = null;
		}
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatNumber(n: number): string {
		if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
		if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
		return n.toString();
	}
</script>

<main>
	<header>
		<h1>Admin Dashboard</h1>
		<p>Manage module submissions and platform statistics</p>
	</header>

	{#if !data.session?.user}
		<section class="content">
			<div class="access-denied">
				<h2>Sign In Required</h2>
				<p>Please sign in with a moderator or admin account to access this page.</p>
				<a href="/login" class="btn btn-primary">Sign In</a>
			</div>
		</section>
	{:else if loading}
		<section class="content">
			<div class="loading">Loading admin data...</div>
		</section>
	{:else if error}
		<section class="content">
			<div class="error">{error}</div>
		</section>
	{:else}
		<section class="content">
			{#if stats}
				<div class="stats-grid">
					<div class="stat-card">
						<span class="stat-value">{formatNumber(stats.total_modules)}</span>
						<span class="stat-label">Total Modules</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{formatNumber(stats.total_users)}</span>
						<span class="stat-label">Total Users</span>
					</div>
					<div class="stat-card">
						<span class="stat-value">{formatNumber(stats.total_downloads)}</span>
						<span class="stat-label">Total Downloads</span>
					</div>
					<div class="stat-card pending">
						<span class="stat-value">{stats.pending_submissions}</span>
						<span class="stat-label">Pending Submissions</span>
					</div>
				</div>
			{/if}

			<div class="submissions-section">
				<h2>Pending Submissions</h2>

				{#if submissions.length === 0}
					<p class="empty">No pending submissions</p>
				{:else}
					<div class="submissions-list">
						{#each submissions as submission}
							<div class="submission-card">
								<div class="submission-header">
									<h3>{submission.name}</h3>
									<span class="category">{submission.category}</span>
								</div>
								<p class="uuid">{submission.uuid}</p>
								<p class="description">{submission.description}</p>
								<div class="submission-meta">
									<span>by {submission.submitter_username}</span>
									<span>v{submission.version}</span>
									<span>{formatDate(submission.submitted_at)}</span>
								</div>
								<div class="submission-actions">
									<a
										href={submission.repo_url}
										target="_blank"
										rel="noopener"
										class="btn btn-secondary"
									>
										View Repo
									</a>
									<button
										class="btn btn-success"
										disabled={actionLoading === submission.id}
										onclick={() => approveSubmission(submission.id)}
									>
										{actionLoading === submission.id ? 'Approving...' : 'Approve'}
									</button>
									<button
										class="btn btn-danger"
										disabled={actionLoading === submission.id}
										onclick={() => (showRejectModal = submission.id)}
									>
										Reject
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</section>
	{/if}

	{#if showRejectModal !== null}
		<div
			class="modal-overlay"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onclick={() => (showRejectModal = null)}
			onkeydown={(e) => e.key === 'Escape' && (showRejectModal = null)}
		>
			<div
				class="modal"
				role="document"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
			>
				<h3>Reject Submission</h3>
				<p>Please provide a reason for rejecting this submission:</p>
				<textarea bind:value={rejectReason} placeholder="Rejection reason..." rows="3"></textarea>
				<div class="modal-actions">
					<button class="btn btn-secondary" onclick={() => (showRejectModal = null)}>
						Cancel
					</button>
					<button
						class="btn btn-danger"
						disabled={actionLoading !== null}
						onclick={() => rejectSubmission(showRejectModal!)}
					>
						{actionLoading !== null ? 'Rejecting...' : 'Reject'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		min-height: 100vh;
	}

	header {
		padding: var(--space-xl) var(--space-2xl);
		border-bottom: 1px solid var(--color-border);
	}

	header h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	header p {
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}

	.content {
		padding: var(--space-2xl);
		max-width: 1200px;
		margin: 0 auto;
	}

	.loading,
	.error,
	.empty {
		text-align: center;
		padding: var(--space-2xl);
		color: var(--color-text-muted);
	}

	.error {
		color: var(--color-error);
	}

	.access-denied {
		text-align: center;
		padding: var(--space-2xl);
	}

	.access-denied h2 {
		margin-bottom: var(--space-md);
	}

	.access-denied p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-xl);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-lg);
		margin-bottom: var(--space-2xl);
	}

	.stat-card {
		background-color: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		text-align: center;
	}

	.stat-card.pending {
		border-color: var(--color-primary);
		background-color: rgba(99, 102, 241, 0.1);
	}

	.stat-value {
		display: block;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-normal);
	}

	.stat-label {
		display: block;
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-top: var(--space-xs);
	}

	.submissions-section h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: var(--space-lg);
	}

	.submissions-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.submission-card {
		background-color: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
	}

	.submission-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-xs);
	}

	.submission-header h3 {
		font-size: 1.125rem;
		font-weight: 600;
	}

	.uuid {
		font-size: 0.75rem;
		color: var(--color-text-faint);
		font-family: monospace;
		margin-bottom: var(--space-md);
	}

	.description {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-bottom: var(--space-md);
		line-height: 1.5;
	}

	.submission-meta {
		display: flex;
		gap: var(--space-lg);
		font-size: 0.75rem;
		color: var(--color-text-faint);
		margin-bottom: var(--space-lg);
	}

	.submission-actions {
		display: flex;
		gap: var(--space-md);
	}

	.category {
		background-color: var(--color-bg-base);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.btn {
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		font-weight: 500;
		font-size: 0.875rem;
		border: none;
		cursor: pointer;
		text-decoration: none;
		display: inline-block;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background-color: var(--color-primary);
		color: white;
	}

	.btn-secondary {
		background-color: var(--color-bg-elevated);
		color: var(--color-text-normal);
		border: 1px solid var(--color-border);
	}

	.btn-success {
		background-color: #22c55e;
		color: white;
	}

	.btn-danger {
		background-color: var(--color-error);
		color: white;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background-color: var(--color-bg-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		max-width: 500px;
		width: 90%;
	}

	.modal h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: var(--space-md);
	}

	.modal p {
		color: var(--color-text-muted);
		font-size: 0.875rem;
		margin-bottom: var(--space-md);
	}

	.modal textarea {
		width: 100%;
		padding: var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-bg-base);
		color: var(--color-text-normal);
		font-size: 0.875rem;
		margin-bottom: var(--space-lg);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: var(--space-md);
	}
</style>
