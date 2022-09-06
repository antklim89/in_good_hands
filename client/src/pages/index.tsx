import { Ad } from '@in-good-hands/server/src/swagger';
import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';
import Hero from '~/layouts/Hero';
import { api } from '~/utils';


interface Props {
    ads: Ad.FindMany.ResponseBody
}

const Home: NextPage<Props> = ({ ads }) => {
    return (
        <>
            <Seo title="Home" />
            <Hero />
            <AdsList ads={ads} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
    const { data: ads } = await api(req).ad.findMany();

    return { props: { ads } };
};

export default Home;
