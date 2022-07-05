import Cookie from 'cookie';

import { STRAPI_URL } from '~/constants';
import type {
    IAdsQuery,
    IAdQuery,
    IAdQueryVariables,
    IAdUpdateMutation,
    IAdUpdateMutationVariables,
    IAdUpdateDataQuery,
    IAdUpdateDataQueryVariables,
} from '~/generated/graphql';
import query from '~/queries/ad.gql';

import requestBase from './requestBase';


type IAdUserMutationOmitVariables = {
    id: IAdUpdateMutationVariables['id'],
    data: Omit<IAdUpdateMutationVariables['data'], 'owner' | 'publishedAt' | 'images'>
}


export async function requestAds(): Promise<IAdsQuery['ads']['data']> {
    const { ads: { data } } = await requestBase<IAdsQuery>({ query: query.Ads });

    return data;
}

export async function requestAd(variables: IAdQueryVariables): Promise<IAdQuery['ad']['data']> {
    const { ad: { data } } = await requestBase<IAdQuery, IAdQueryVariables>({
        query: query.Ad,
        variables,
    });

    return data;
}

export async function requestAdUpdateData(variables: IAdUpdateDataQueryVariables): Promise<IAdUpdateDataQuery['ads']['data'][0]> {
    const { ads: { data: [data] } } = await requestBase<IAdUpdateDataQuery, IAdUpdateDataQueryVariables>({
        query: query.AdUpdateData,
        variables,
    });

    return data;
}

export async function requestUpdateAd(variables: IAdUserMutationOmitVariables): Promise<string> {
    const { updateAd: { data: { id } } } = await requestBase<IAdUpdateMutation, IAdUserMutationOmitVariables>({
        query: query.AdUpdate,
        variables,
    });

    return id;
}


export async function requestNewAd(): Promise<number> {
    const token = Cookie.parse(document.cookie).JWT;
    const data = await fetch(`${STRAPI_URL}/api/ads/new`, {
        method: 'POST',
        body: JSON.stringify({ data: {} }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then((r) => r.json());
    return data as number;
}
