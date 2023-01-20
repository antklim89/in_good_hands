import { Ad } from '@in-good-hands/server/src/swagger';
import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';
import { api, withTimeout } from '~/utils';


interface Props {
    ads: Ad.FindMany.ResponseBody
}

const AllAdsPage: NextPage<Props> = ({ ads }) => {
    return (
        <>
            <Seo title="All ads" />
            <AdsList ads={ads} />
        </>
    );
};

export const getServerSideProps = withTimeout<Props>(async ({ req, query }) => {
    const { data: ads } = await api(req).ad.findMany({
        searchType: query.type as 'cat' | 'dog' | 'bird' | 'aquarium' | 'rodent' | undefined,
        search: query.search as string,
    });

    return { props: { ads } };
});

export default AllAdsPage;
