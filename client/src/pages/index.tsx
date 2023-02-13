import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';
import Hero from '~/layouts/Hero';


const Home: NextPage = () => {
    return (
        <>
            <Seo title="Home" />
            <Hero />
            <AdsList />
        </>
    );
};


export default Home;


