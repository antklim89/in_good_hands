import type { NextPage } from 'next';

import AdsList from '~/components/features/AdsList';
import Seo from '~/components/helpers/Seo';
import Hero from '~/components/layouts/Hero';


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


