// @ts-nocheck

import { redirect } from '@sveltejs/kit';
import { USERS } from '$lib/server/secrets.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

    let username = cookies.get('username');
    let password = cookies.get('password');

    let loggedIn = false;

    for (const user of USERS) {
        if (username === user['username'] && password === user['password']) {
            loggedIn = true;
            break;
        }
    }
    if (loggedIn) {
        throw redirect(303, '/home');
    }

}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        for (const user of USERS) {
            if (username === user['username'] && password === user['password']) {
                cookies.set('username', username, {secure: false, path: '/',});
                cookies.set('password', password, {secure: false, path: '/',});
                return { wrongLogin: false };
            }
        }

        return { wrongLogin: true };
    },
};
