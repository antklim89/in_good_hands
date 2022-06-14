import { STRAPI_URL } from '~/constants';


interface RequestBaseArgs<V> {
    query: string
    variables?: V
}

const GRAPHQL_URL = `${STRAPI_URL}/graphql`;


export default async function requestBase<
    T = unknown, V = Record<string, string>
>({ query, variables }: RequestBaseArgs<V>): Promise<T> {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}
