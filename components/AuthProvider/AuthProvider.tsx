import { createContext, FC, useCallback, useMemo, useState } from 'react';

import { AuthProviderProps } from './AuthProvider.types';


export const AuthContext = createContext({});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [email, setEmail] = useState<null|string>(null);
    const [username, setUsername] = useState<null|string>(null);

    const setCredentials = useCallback((e: {username: string, email: string}) => {
        setEmail(e.email);
        setUsername(e.username);
    }, []);

    const clearCredentials = useCallback(() => {
        setEmail(null);
        setUsername(null);
    }, []);

    const isAuth = useMemo(() => Boolean(email), [email, username]);

    const value = useMemo(() => ({
        email,
        username,
        isAuth,
        setCredentials,
        clearCredentials,
    }), [email, username]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
