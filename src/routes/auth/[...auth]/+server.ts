import { handle } from '../../../auth';
import type { RequestHandler } from './$types';

const authHandler: RequestHandler = async (event) => {
	return await handle({ event, resolve: () => new Response() });
};

export const GET = authHandler;
export const POST = authHandler;
