import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    cookies.delete('username', {secure: false, path: '/'});
    cookies.delete('password', {secure: false, path: '/'});

    throw redirect(303, '/login');

}
