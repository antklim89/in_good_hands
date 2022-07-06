import {
    createContext, FC, useCallback, useEffect, useMemo, useState,
} from 'react';

import { getUserCookie } from '~/utils';

import { AuthProviderProps, IAuthContext } from './AuthProvider.types';


export const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [email, setEmail] = useState<IAuthContext['email']>(null);
    const [username, setUsername] = useState<IAuthContext['username']>(null);
    const [authInited, setAuthInited] = useState(false);

    useEffect(() => {
        try {
            const user = getUserCookie();
            if (!user) {
                setAuthInited(true);
                return;
            }
            setEmail(user.email);
            setUsername(user.username);
        } catch (_) {
            // void
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

    return (
        <AuthContext.Provider
            value={{
                email,
                username,
                isAuth,
                authInited,
                setCredentials,
                clearCredentials,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
