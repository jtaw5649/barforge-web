import { describe, it, expect } from 'vitest';
import { encodeModuleUuid, cleanRedirectUrl } from './url';

describe('encodeModuleUuid', () => {
	it('keeps @ in the output', () => {
		expect(encodeModuleUuid('cpu@system')).toBe('cpu@system');
	});

	it('encodes spaces and special characters', () => {
		expect(encodeModuleUuid('cpu temp@system')).toBe('cpu%20temp@system');
		expect(encodeModuleUuid('cpu#temp@system')).toBe('cpu%23temp@system');
	});
});

describe('cleanRedirectUrl', () => {
	it('keeps path slashes readable', () => {
		expect(cleanRedirectUrl('/admin')).toBe('/admin');
		expect(cleanRedirectUrl('/')).toBe('/');
	});

	it('encodes query string characters safely', () => {
		expect(cleanRedirectUrl('/modules?sort=new')).toBe('/modules%3Fsort%3Dnew');
		expect(cleanRedirectUrl('/modules?tag=cpu&sort=new')).toBe('/modules%3Ftag%3Dcpu%26sort%3Dnew');
	});
});
