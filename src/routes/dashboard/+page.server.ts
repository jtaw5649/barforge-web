import type { PageServerLoad, Actions } from './$types';
import { API_BASE_URL } from '$lib';
import { fail } from '@sveltejs/kit';

interface Module {
	uuid: string;
	name: string;
	author: string;
	description: string;
	category: string;
	downloads: number;
	rating: number | null;
	version: { major: number; minor: number; patch: number } | null;
}

interface UserProfile {
	id: number;
	username: string;
	display_name: string | null;
	avatar_url: string | null;
	bio: string | null;
	website_url: string | null;
	verified_author: boolean;
	module_count: number;
	created_at: string;
}

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session?.user) {
		return { session, profile: null, modules: [] };
	}

	const sessionToken = event.cookies.get('authjs.session-token');

	if (!sessionToken) {
		return { session, profile: null, modules: [] };
	}

	const cookieHeader = `authjs.session-token=${sessionToken}`;

	try {
		const [profileRes, modulesRes] = await Promise.all([
			fetch(`${API_BASE_URL}/api/v1/users/me`, {
				headers: { Cookie: cookieHeader }
			}),
			fetch(`${API_BASE_URL}/api/v1/modules/mine`, {
				headers: { Cookie: cookieHeader }
			})
		]);

		let profile: UserProfile | null = null;
		let modules: Module[] = [];

		if (profileRes.ok) {
			profile = await profileRes.json();
		}

		if (modulesRes.ok) {
			const data = await modulesRes.json();
			modules = data.modules || [];
		}

		return { session, profile, modules };
	} catch {
		return { session, profile: null, modules: [] };
	}
};

export const actions: Actions = {
	updateProfile: async (event) => {
		const session = await event.locals.auth();
		if (!session?.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const sessionToken = event.cookies.get('authjs.session-token');
		if (!sessionToken) {
			return fail(401, { message: 'Unauthorized' });
		}

		const formData = await event.request.formData();
		const display_name = formData.get('display_name') as string | null;
		const bio = formData.get('bio') as string | null;
		const website_url = formData.get('website_url') as string | null;

		const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `authjs.session-token=${sessionToken}`
			},
			body: JSON.stringify({
				display_name: display_name || null,
				bio: bio || null,
				website_url: website_url || null
			})
		});

		if (!res.ok) {
			return fail(res.status, { message: 'Failed to update profile' });
		}

		return { success: true };
	}
};
