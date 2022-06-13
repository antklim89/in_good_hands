import { ReactNode } from 'react';


export interface AuthProviderProps {
     children: ReactNode
}

export interface IAuthContext {
     email: string | null;
     username: string | null;
     isAuth: boolean;
     authInited: boolean;
     setCredentials: (e: {
         username: string;
         email: string;
     }) => void;
     clearCredentials: () => void;
 }

