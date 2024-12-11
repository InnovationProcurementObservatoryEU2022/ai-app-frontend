// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { USERS } from '$lib/server/secrets.js';


export const load = (async ({ cookies }) => {
    console.log('layout cookie');

    let username = cookies.get('username');
    let password = cookies.get('password');

    let loggedIn = false;

    for (const user of USERS) {
        if (username === user['username'] && password === user['password']) {
            loggedIn = true;
            break;
        }
    }
    if (!loggedIn) {
        throw redirect(303, '/login');
    }
});