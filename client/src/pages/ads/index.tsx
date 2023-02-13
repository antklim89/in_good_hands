import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';


const AllAdsPage: NextPage = () => {
    return (
        <>
            <Seo title="All ads" />
            <AdsList />
        </>
    );
};

export default AllAdsPage;
