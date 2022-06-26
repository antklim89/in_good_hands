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
import { IAdEdit, IAdPreview } from '~/types';

import requestBase from './requestBase';


type IAdUserMutationOmitVariables = {
    id: IAdUpdateMutationVariables['id'],
    data: Omit<IAdUpdateMutationVariables['data'], 'user' | 'publishedAt' | 'images'>
}


export async function requestAds(): Promise<IAdPreview[]> {
    const { ads } = await requestBase<IAdsQuery>({ query: query.Ads });

    return ads.data.map(({ id, attributes: { images, ...data } }) => ({
        id,
        ...data,
        images: images.data.map((image) => (image.attributes.url)),
    }));
}

export async function requestAd(adId: string): Promise<IAdPreview> {
    const { ad: { data: { id, attributes: { images, ...data } } } } = await requestBase<IAdQuery, IAdQueryVariables>({
        query: query.Ad,
        variables: { id: adId },
    });

    return {
        id,
        ...data,
        images: images.data.map((image) => (image.attributes.url)),
    };
}

export async function requestAdUpdateData(adId: string): Promise<IAdEdit> {
    const data = await requestBase<IAdUpdateDataQuery, IAdUpdateDataQueryVariables>({
        query: query.AdUpdateData,
        variables: { id: adId },
    });

    const { ad: { data: { id, attributes: { images, ...attributes } } } } = data;
    return {
        id,
        ...attributes,
        images: images.data.map((image) => (image.attributes.url)),
    };
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
