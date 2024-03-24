import { createContext, FC, useCallback, useMemo } from 'react';

import { AuthProviderProps, IAuthContext } from './AuthProvider.types';

import { api, clearUserCookie, getUserCookie, setUserCookie } from '~/utils';


export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const { user } = useMemo(() => getUserCookie() || { user: null }, []);
    const isAuth = useMemo(() => Boolean(user), [user]);


    const login: IAuthContext['login'] = useCallback(async (body) => {
        const { data } = await api().auth.login(body);
        setUserCookie(data);
        location.reload();
    }, []);

    const register: IAuthContext['register'] = useCallback(async (body) => {
        const { data } = await api().auth.register(body);
        setUserCookie(data);
        location.reload();
    }, []);

    const logout: IAuthContext['logout'] = useCallback(() => {
        clearUserCookie();
        location.reload();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
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
