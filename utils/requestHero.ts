import type { IHeroQuery } from '~/generated/graphql';
import { HeroQuery } from '~/queries/Hero';
import { IHero } from '~/types';

import requestBase from './requestBase';


export async function requestHero(): Promise<IHero> {
    const { hero: { data: { attributes } } } = await requestBase<IHeroQuery>({ query: HeroQuery });

    return {
        body: attributes.body,
        image: attributes.image.data.attributes.url,
    };
}
