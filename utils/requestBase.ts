import type { DocumentNode } from 'graphql';

import { STRAPI_URL } from '~/constants';


interface RequestBaseArgs<V> {
    query: DocumentNode
    variables?: V
}

const GRAPHQL_URL = `${STRAPI_URL}/graphql`;


export default async function requestBase<
    T = unknown, V = Record<string, string>
>({ query, variables }: RequestBaseArgs<V>): Promise<T> {
    const { print } = await import('graphql');

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
