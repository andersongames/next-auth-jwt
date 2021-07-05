import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { signInRequest, recoverUserInfo } from "../services/auth";
import { api } from "../services/api";

type SignInData = {
    email: String;
    password: String;
}

type UserData = {
    name: string;
    email: string;
    avatar_url: string;
}

type AuthContextType = {
    user: UserData;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
}

export const  AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
    const [user, setUser] = useState<UserData | null>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'next-auth.token': token } = parseCookies();

        if (token) {
            recoverUserInfo().then(response => {
                setUser(response.user);
            });
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        const { token, user } = await signInRequest({
            email,
            password,
        });

        setCookie(undefined, 'next-auth.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user);

        Router.push('/dashboard');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}