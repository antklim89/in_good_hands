import {
    createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import { AuthProviderProps, IAuthContext } from './AuthProvider.types';

import { IUser } from '~/types';
import { api, clearUserCookie, getUserCookie, setUserCookie } from '~/utils';


export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [authInited, setAuthInited] = useState(false);

    const isAuth = useMemo(() => Boolean(user), [user]);

    useEffect(() => {
        const userCookie = getUserCookie();
        setUser(userCookie?.user || null);
        setAuthInited(true);
    }, []);


    const login: IAuthContext['login'] = useCallback(async (body) => {
        const { data } = await api().auth.login(body);
        setUserCookie(data);
        setUser(data.user);
    }, []);

    const register: IAuthContext['register'] = useCallback(async (body) => {
        const { data } = await api().auth.register(body);
        setUserCookie(data);
        setUser(data.user);
    }, []);

    const logout: IAuthContext['logout'] = useCallback(() => {
        setUser(null);
        clearUserCookie();
        location.reload();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
                authInited,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
