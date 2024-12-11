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
    } else {
        throw redirect(303, '/login');
    }

}