import { ReactNode } from 'react';


export interface AuthProviderProps {
     children: ReactNode
}

export interface IAuthContext {
     id: string | null;
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

