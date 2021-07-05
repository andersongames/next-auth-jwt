// Simulate sign in request

import { v4 as uuid } from 'uuid';

type SignInRequestData = {
    email: String;
    password: String;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));

export async function signInRequest(data: SignInRequestData) {
    await delay();

    return {
        token: uuid(),
        user: {
            name: 'Anderson Games',
            email: 'andersonpgames@gmail.com',
            avatar_url: 'https://github.com/andersongames.png',
        },
    }
}

export async function recoverUserInfo() {
    await delay();

    return {
        user: {
            name: 'Anderson Games',
            email: 'andersonpgames@gmail.com',
            avatar_url: 'https://github.com/andersongames.png',
        },
    }
}