import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import { IHero } from '~/types';
import { fetchHero } from '~/utils/server';


interface Props {
    hero: IHero
}

const Home: NextPage<Props> = () => {
    return (
        <>
            <Seo title="Home" />
            <h1>HELLO</h1>
        </>
    );
};

export default Home;


export const getStaticProps: GetStaticProps<Props> = async () => {
    const hero = await fetchHero();


    return { props: { hero } };
};
