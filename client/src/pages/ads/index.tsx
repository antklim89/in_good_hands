import type { NextPage } from 'next';

import AdsList from '~/components/features/AdsList';
import Seo from '~/components/helpers/Seo';


const AllAdsPage: NextPage = () => {
    return (
        <>
            <Seo title="All ads" />
            <AdsList />
        </>
    );
};

export default AllAdsPage;
