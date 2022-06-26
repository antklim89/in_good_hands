import Cookie from 'cookie';

import { AUTH_COOKIE_EXPIRES_TIME, JWT_STORAGE_NAME, USER_STORAGE_NAME } from '~/constants';
import { ILoginMutation, ILoginMutationVariables, IRegisterMutationVariables, IRegisterMutation } from '~/generated/graphql';
import query from '~/queries/Auth.gql';

import requestBase from './requestBase';


interface UserRequestAuth {
    username: string;
    email: string;
}

function getOptions(): Cookie.CookieSerializeOptions {
    const date = new Date();
    date.setDate(date.getDate() + AUTH_COOKIE_EXPIRES_TIME);
    const expires = new Date(date);

    return { expires };
}

export async function login(variables: ILoginMutationVariables): Promise<UserRequestAuth> {
    const data = await requestBase<ILoginMutation>({ query: query.Login, variables });
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.login.user), getOptions());
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, data.login.jwt, getOptions());
    return data.login.user;
}

export async function register(variables: IRegisterMutationVariables): Promise<UserRequestAuth> {
    const data = await requestBase<IRegisterMutation>({ query: query.Register, variables });
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, JSON.stringify(data.register.user), getOptions());
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, data.register.jwt, getOptions());
    return data.register.user;
}

export function logout(): void {
    document.cookie = Cookie.serialize(USER_STORAGE_NAME, '', { expires: new Date(0) });
    document.cookie = Cookie.serialize(JWT_STORAGE_NAME, '', { expires: new Date(0) });
}
