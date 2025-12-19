<script lang="ts">
	interface Props {
		variant?: 'text' | 'avatar' | 'card' | 'button';
		width?: string;
		height?: string;
		class?: string;
	}

	let { variant = 'text', width, height, class: className = '' }: Props = $props();

	const variantStyles = {
		text: { w: '100%', h: '1rem', radius: 'var(--radius-sm)' },
		avatar: { w: '40px', h: '40px', radius: '50%' },
		card: { w: '100%', h: '200px', radius: 'var(--radius-lg)' },
		button: { w: '80px', h: '36px', radius: 'var(--radius-md)' }
	};

	const style = $derived(variantStyles[variant]);
</script>

<div
	class="skeleton {className}"
	style="width: {width || style.w}; height: {height || style.h}; border-radius: {style.radius};"
	aria-hidden="true"
></div>

<style>
	.skeleton {
		background: linear-gradient(
			90deg,
			var(--color-bg-elevated) 0%,
			var(--color-bg-surface) 50%,
			var(--color-bg-elevated) 100%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
