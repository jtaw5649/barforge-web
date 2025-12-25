import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import CategoryIcon from './CategoryIcon.svelte';

describe('CategoryIcon', () => {
	it('renders icon for valid category slug', () => {
		const { container } = render(CategoryIcon, { props: { slug: 'system' } });
		const svg = container.querySelector('svg');
		expect(svg).toBeTruthy();
	});
});
