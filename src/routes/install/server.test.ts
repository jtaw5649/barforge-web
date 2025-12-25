import { describe, it, expect } from 'vitest';
import { GET } from './+server';

describe('GET /install', () => {
	it('throws redirect to installer script', () => {
		try {
			GET({} as Parameters<typeof GET>[0]);
			expect.fail('Expected redirect to be thrown');
		} catch (e) {
			const error = e as { status: number; location: string };
			expect(error.status).toBe(301);
			expect(error.location).toContain('barforge-bin-installer.sh');
		}
	});
});
