import Cookie from 'cookie';

import { JWT_STORAGE_NAME, USER_STORAGE_NAME } from '~/constants';
import { ILoginMutation, ILoginMutationVariables, IRegisterMutationVariables, IRegisterMutation } from '~/generated/graphql';
import { LoginQuery, RegisterQuery } from '~/queries/Auth';

import requestBase from './requestBase';


interface UserRequestAuth {
    username: string;
    email: string;
}

export async function login(variables: ILoginMutationVariables): Promise<UserRequestAuth> {
    const data = await requestBase<ILoginMutation>({ query: LoginQuery, variables });
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.login.user));
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, JSON.stringify(data.login.jwt));
    return data.login.user;
}

export async function register(variables: IRegisterMutationVariables): Promise<UserRequestAuth> {
    const data = await requestBase<IRegisterMutation>({ query: RegisterQuery, variables });
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.register.user));
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, JSON.stringify(data.register.jwt));
    return data.register.user;
}

export function logout(): void {
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, '', { expires: new Date(0) });
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, '', { expires: new Date(0) });
}
