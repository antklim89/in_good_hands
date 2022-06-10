import Cookie from 'cookie';

import { JWT_STORAGE_NAME, USER_STORAGE_NAME } from '~/constants';
import { ILoginMutation, ILoginMutationVariables, IRegisterMutationVariables, IRegisterMutation } from '~/generated/graphql';
import { LoginQuery, RegisterQuery } from '~/queries/Auth';

import baseFetch from './baseFetch';


export async function login(variables: ILoginMutationVariables): Promise<void> {
    try {
        const data = await baseFetch<ILoginMutation>({ query: LoginQuery, variables });
        document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.login.user));
        document.cookie = Cookie.serialize(JWT_STORAGE_NAME, JSON.stringify(data.login.jwt));
    } catch (error) {
        console.error(error);
    }
}

export async function register(variables: IRegisterMutationVariables): Promise<void> {
    try {
        const data = await baseFetch<IRegisterMutation>({ query: RegisterQuery, variables });
        document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.register.user));
        document.cookie = Cookie.serialize(JWT_STORAGE_NAME, JSON.stringify(data.register.jwt));
    } catch (error) {
        console.error(error);
    }
}

export function logout(): void {
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, '', { expires: new Date(0) });
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, '', { expires: new Date(0) });
}
