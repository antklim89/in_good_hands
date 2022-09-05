import { Ad } from '@in-good-hands/server/src/swagger';
import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';
import { api } from '~/utils';


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

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
    const { data: ads } = await api().ad.findMany({
        searchType: query.type as 'cat' | 'dog' | 'bird' | 'aquarium' | 'rodent' | undefined,
        search: query.search as string,
    });

    return { props: { ads } };
};

export default AllAdsPage;
