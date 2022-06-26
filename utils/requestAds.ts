import Cookie from 'cookie';

import { STRAPI_URL } from '~/constants';
import type { IAdsQuery } from '~/generated/graphql';
import query from '~/queries/Ads.gql';
import { IAd } from '~/types';

import requestBase from './requestBase';


export async function requestAds(): Promise<IAd[]> {
    const { ads } = await requestBase<IAdsQuery>({ query: query.Ads });

    return ads.data.map(({ id, attributes: { images, ...data } }) => ({
        id,
        ...data,
        images: images.data.map((image) => (image.attributes.url)),
    }));
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
