import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Footer from './Footer.svelte';

describe('Footer', () => {
	it('renders footer brand with logo', () => {
		render(Footer);
		const brand = screen.getByRole('link', { name: /barforge/i });
		expect(brand).toBeTruthy();
	});
});
