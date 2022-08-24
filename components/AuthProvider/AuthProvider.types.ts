import type { Auth } from '@in_good_hands/server/src/swagger';
import { ReactNode } from 'react';

import { IUser } from '~/types';


export interface AuthProviderProps {
    children: ReactNode
}

export interface IAuthContext {
    user: IUser|null
    isAuth: boolean;
    authInited: boolean;
    login: (e: Auth.Login.RequestBody) => void;
    register: (e: Auth.Register.RequestBody) => void;
    logout: () => void;
}

