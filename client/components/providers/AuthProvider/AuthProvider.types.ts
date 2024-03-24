import type { Auth } from '@in-good-hands/share/swagger';
import { ReactNode } from 'react';

import { IUser } from '~/types';


export interface AuthProviderProps {
    children: ReactNode
}

export interface IAuthContext {
    user: IUser|null
    isAuth: boolean;
    login: (e: Auth.Login.RequestBody) => void;
    register: (e: Auth.Register.RequestBody) => void;
    logout: () => void;
}

