import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Hero from '~/layouts/Hero';
import { IHero } from '~/types';
import { requestHero } from '~/utils';


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
    const hero = await requestHero();


    return { props: { hero } };
};
