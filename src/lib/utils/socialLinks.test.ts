import { describe, it, expect } from 'vitest';
import { validateSocialUrl, extractSocialHandle, formatSocialUrl } from './socialLinks';

describe('validateSocialUrl', () => {
	describe('github', () => {
		it('accepts valid github profile URL', () => {
			expect(validateSocialUrl('github', 'https://github.com/username')).toBe(true);
		});

		it('accepts github URL with trailing slash', () => {
			expect(validateSocialUrl('github', 'https://github.com/username/')).toBe(true);
		});

		it('rejects github repo URL', () => {
			expect(validateSocialUrl('github', 'https://github.com/user/repo')).toBe(false);
		});

		it('rejects non-github URL', () => {
			expect(validateSocialUrl('github', 'https://gitlab.com/username')).toBe(false);
		});

		it('accepts empty string', () => {
			expect(validateSocialUrl('github', '')).toBe(true);
		});
	});

	describe('twitter', () => {
		it('accepts twitter.com URL', () => {
			expect(validateSocialUrl('twitter', 'https://twitter.com/username')).toBe(true);
		});

		it('accepts x.com URL', () => {
			expect(validateSocialUrl('twitter', 'https://x.com/username')).toBe(true);
		});

		it('rejects non-twitter URL', () => {
			expect(validateSocialUrl('twitter', 'https://example.com/username')).toBe(false);
		});

		it('accepts empty string', () => {
			expect(validateSocialUrl('twitter', '')).toBe(true);
		});
	});
});

describe('extractSocialHandle', () => {
	describe('github', () => {
		it('extracts username from github URL', () => {
			expect(extractSocialHandle('github', 'https://github.com/octocat')).toBe('octocat');
		});

		it('removes trailing slash', () => {
			expect(extractSocialHandle('github', 'https://github.com/octocat/')).toBe('octocat');
		});

		it('returns empty for invalid URL', () => {
			expect(extractSocialHandle('github', 'invalid')).toBe('');
		});
	});

	describe('twitter', () => {
		it('extracts handle from twitter.com', () => {
			expect(extractSocialHandle('twitter', 'https://twitter.com/jack')).toBe('jack');
		});

		it('extracts handle from x.com', () => {
			expect(extractSocialHandle('twitter', 'https://x.com/elonmusk')).toBe('elonmusk');
		});
	});
});

describe('formatSocialUrl', () => {
	describe('github', () => {
		it('formats github handle to URL', () => {
			expect(formatSocialUrl('github', 'octocat')).toBe('https://github.com/octocat');
		});

		it('handles @ prefix', () => {
			expect(formatSocialUrl('github', '@octocat')).toBe('https://github.com/octocat');
		});

		it('returns empty for empty input', () => {
			expect(formatSocialUrl('github', '')).toBe('');
		});
	});

	describe('twitter', () => {
		it('formats twitter handle to URL', () => {
			expect(formatSocialUrl('twitter', 'jack')).toBe('https://x.com/jack');
		});

		it('handles @ prefix', () => {
			expect(formatSocialUrl('twitter', '@jack')).toBe('https://x.com/jack');
		});
	});
});
