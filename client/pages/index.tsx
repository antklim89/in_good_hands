import { Ad } from '@in-good-hands/server/src/swagger';
import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import AdsList from '~/layouts/AdsList';
import Hero from '~/layouts/Hero';
import { api } from '~/utils';


interface Props {
    ads: Ad.PreviewList.ResponseBody
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

export default Home;


export const getStaticProps: GetStaticProps<Props> = async () => {
    const { data: ads } = await api().ad.previewList();

    return { props: { ads } };
};
