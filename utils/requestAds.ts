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
