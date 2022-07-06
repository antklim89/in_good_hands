import type { DocumentNode } from 'graphql';

import { STRAPI_URL } from '~/constants';

import { getJWTCookie } from '.';


interface RequestBaseArgs<V> {
    query: DocumentNode;
    variables?: V;
    jwt?: string;
}

const GRAPHQL_URL = `${STRAPI_URL}/graphql`;


export default async function requestBase<
    T = unknown, V = Record<string, string>
>({ query, variables, jwt }: RequestBaseArgs<V>): Promise<T> {
    const { print } = await import('graphql');
    const token = getJWTCookie(jwt);

    const headers = {
        'Content-Type': 'application/json',
        ...token ? { 'Authorization': `Bearer ${token}` } : {},
    };
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query: print(query),
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}
