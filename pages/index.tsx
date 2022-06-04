import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Hero from '~/layouts/Hero';
import { IHero } from '~/types';
import { fetchHero } from '~/utils/server';


interface Props {
    hero: IHero
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
    const hero = await fetchHero();


    return { props: { hero } };
};
