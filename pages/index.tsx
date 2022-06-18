import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Hero from '~/layouts/Hero';
import { IAd, IHero } from '~/types';
import { requestHero } from '~/utils';
import { requestAds } from '~/utils/requestAds';


interface Props {
    hero: IHero
    ads: IAd[]
}

const Home: NextPage<Props> = ({ hero }) => {
    return (
        <>
            <Seo title="Home" />
            <Hero {...hero} />
        </>
    );
};

export default Home;


export const getStaticProps: GetStaticProps<Props> = async () => {
    const hero = await requestHero();
    const ads = await requestAds();

    return { props: { hero, ads } };
};
