import type { IHeroQuery } from '~/generated/graphql';
import query from '~/queries/hero.gql';

import requestBase from './requestBase';


export async function requestHero(): Promise<IHeroQuery['hero']['data']> {
    const { hero: { data } } = await requestBase<IHeroQuery>({ query: query.Hero });

    return data;
}
