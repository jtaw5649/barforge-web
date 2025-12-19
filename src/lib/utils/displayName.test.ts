import { describe, it, expect } from 'vitest';
import { getDisplayName, getProfileUsername } from './displayName';

describe('getDisplayName', () => {
	it('returns formValue when non-empty', () => {
		expect(getDisplayName('Custom Name', 'Profile Name', 'GitHub Name', 'fallback')).toBe(
			'Custom Name'
		);
	});

	it('returns profileValue when formValue is empty string', () => {
		expect(getDisplayName('', 'Profile Name', 'GitHub Name', 'fallback')).toBe('Profile Name');
	});

	it('returns githubName when formValue and profileValue are empty', () => {
		expect(getDisplayName('', '', 'GitHub Name', 'fallback')).toBe('GitHub Name');
	});

	it('returns fallback when all values are empty', () => {
		expect(getDisplayName('', '', '', 'username')).toBe('username');
	});

	it('handles null formValue', () => {
		expect(getDisplayName(null, 'Profile Name', 'GitHub Name', 'fallback')).toBe('Profile Name');
	});

	it('handles undefined formValue', () => {
		expect(getDisplayName(undefined, 'Profile Name', 'GitHub Name', 'fallback')).toBe(
			'Profile Name'
		);
	});

	it('handles null profileValue', () => {
		expect(getDisplayName('', null, 'GitHub Name', 'fallback')).toBe('GitHub Name');
	});

	it('handles null githubName', () => {
		expect(getDisplayName('', '', null, 'fallback')).toBe('fallback');
	});

	it('handles all null values', () => {
		expect(getDisplayName(null, null, null, 'fallback')).toBe('fallback');
	});

	it('trims whitespace from formValue', () => {
		expect(getDisplayName('  Name  ', 'Profile', 'GitHub', 'fallback')).toBe('Name');
	});

	it('treats whitespace-only formValue as empty', () => {
		expect(getDisplayName('   ', 'Profile Name', 'GitHub', 'fallback')).toBe('Profile Name');
	});
});

describe('getProfileUsername', () => {
	it('returns profileUsername when available', () => {
		expect(getProfileUsername('profileuser', 'sessionuser')).toBe('profileuser');
	});

	it('falls back to sessionLogin when profileUsername is null', () => {
		expect(getProfileUsername(null, 'sessionuser')).toBe('sessionuser');
	});

	it('falls back to sessionLogin when profileUsername is undefined', () => {
		expect(getProfileUsername(undefined, 'sessionuser')).toBe('sessionuser');
	});

	it('falls back to sessionLogin when profileUsername is empty string', () => {
		expect(getProfileUsername('', 'sessionuser')).toBe('sessionuser');
	});

	it('returns empty string when both are null', () => {
		expect(getProfileUsername(null, null)).toBe('');
	});

	it('returns empty string when both are undefined', () => {
		expect(getProfileUsername(undefined, undefined)).toBe('');
	});

	it('returns empty string when both are empty strings', () => {
		expect(getProfileUsername('', '')).toBe('');
	});
});
