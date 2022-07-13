import {
    ILoginMutation,
    ILoginMutationVariables,
    IRegisterMutationVariables,
    IRegisterMutation,
    IUpdateCredentialsMutation,
} from '~/generated/graphql';
import query from '~/queries/auth.gql';

import { clearJWTCookie, clearUserCookie, setJWTCookie, setUserCookie } from './getCookies';
import requestBase from './requestBase';


export async function login(variables: ILoginMutationVariables): Promise<ILoginMutation['login']['user']> {
    const data = await requestBase<ILoginMutation>({ query: query.Login, variables });
    setUserCookie(data.login.user);
    setJWTCookie(data.login.jwt);
    return data.login.user;
}

export async function register(variables: IRegisterMutationVariables): Promise<IRegisterMutation['register']['user']> {
    const data = await requestBase<IRegisterMutation>({ query: query.Register, variables });
    setUserCookie(data.register.user);
    setJWTCookie(data.register.jwt);
    return data.register.user;
}

export function logout(): void {
    clearUserCookie();
    clearJWTCookie();
}

export async function updateCredentials(variables: {id: string, data: {email: string, username: string}}): Promise<IUpdateCredentialsMutation['updateUsersPermissionsUser']['data']> {
    const data = await requestBase<
        IUpdateCredentialsMutation,
        {id: string, data: {email: string, username: string}}
    >({ query: query.UpdateCredentials, variables });

    return data.updateUsersPermissionsUser.data;
}
