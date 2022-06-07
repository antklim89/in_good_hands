import { ILoginMutation, ILoginMutationVariables, IRegisterMutationVariables, IRegisterMutation } from '~/generated/graphql';
import { LoginQuery, RegisterQuery } from '~/queries/Auth';

import baseFetch from './baseFetch';


export async function login(variables: ILoginMutationVariables): Promise<void> {
    try {
        const data = await baseFetch<ILoginMutation>({ query: LoginQuery, variables });
        document.cookie = `jwt=${data.login.jwt}`;
    } catch (error) {
        console.error(error);
    }
}

export async function register(variables: IRegisterMutationVariables): Promise<void> {
    try {
        const data = await baseFetch<IRegisterMutation>({ query: RegisterQuery, variables });
        document.cookie = `jwt=${data.register.jwt}`;
    } catch (error) {
        console.error(error);
    }
}
