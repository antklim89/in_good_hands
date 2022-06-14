import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import EditAd from '~/layouts/EditAd';


const Home: NextPage = () => {
    return (
        <>
            <Seo title="Create new ad" />
            <EditAd />
        </>
    );
};

export default Home;


