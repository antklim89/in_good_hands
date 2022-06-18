import type { IHeroQuery } from '~/generated/graphql';
import query from '~/queries/Hero.gql';
import { IHero } from '~/types';

import requestBase from './requestBase';


export async function requestHero(): Promise<IHero> {
    const { hero: { data: { attributes } } } = await requestBase<IHeroQuery>({ query: query.Hero });

    return {
        body: attributes.body,
        image: attributes.image.data.attributes.url,
    };
}
