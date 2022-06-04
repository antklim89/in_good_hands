import type { IHeroQuery } from '~/generated/graphql';
import { HeroQuery } from '~/queries/Hero';
import { IHero } from '~/types';

import baseFetch from './baseFetch';


export async function fetchHero(): Promise<IHero> {
    const { hero: { data: { attributes } } } = await baseFetch<IHeroQuery>({ query: HeroQuery });

    return {
        body: attributes.body,
        image: attributes.image.data.attributes.url,
    };
}
