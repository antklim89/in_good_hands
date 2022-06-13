import Cookie from 'cookie';
import {
    createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import { USER_STORAGE_NAME } from '~/constants';

import { AuthProviderProps, IAuthContext } from './AuthProvider.types';


export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [email, setEmail] = useState<IAuthContext['email']>(null);
    const [username, setUsername] = useState<IAuthContext['username']>(null);
    const [authInited, setAuthInited] = useState(false);

    useEffect(() => {
        try {
            const userString = Cookie.parse(document.cookie)[USER_STORAGE_NAME];
            const user = JSON.parse(userString);
            setEmail(user.email);
            setUsername(user.username);
        } finally {
            setAuthInited(true);
        }
    }, []);


    const setCredentials: IAuthContext['setCredentials'] = useCallback((e) => {
        setEmail(e.email);
        setUsername(e.username);
    }, []);

    const clearCredentials: IAuthContext['clearCredentials'] = useCallback(() => {
        setEmail(null);
        setUsername(null);
    }, []);

    const isAuth = useMemo(() => Boolean(email), [email, username]);

    const value: IAuthContext = useMemo(() => ({
        email,
        username,
        isAuth,
        authInited,
        setCredentials,
        clearCredentials,
    }), [email, username]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
