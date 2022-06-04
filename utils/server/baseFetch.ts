import { STRAPI_URL } from '~/constants';


interface BaseFetchArgs<Q, V> {
    query: Q
    variables?: V
}

const GRAPHQL_URL = `${STRAPI_URL}/graphql`;


export default async function baseFetch<
    T = unknown, Q = string, V = Record<string, string>
>({ query, variables }: BaseFetchArgs<Q, V>): Promise<T> {

    const resp = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const result = await resp.json();

    return result.data;
}
