import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import { api } from '~/utils';


interface Props {
}

const AdPage: NextPage<Props> = () => {
    return (
        <>
            <Seo title="All ads" />
        </>
    );
};

export default AdPage;


export const getStaticPaths: GetStaticPaths = async () => {
    const { data: adsIds } = await api().ad.adsIds();
    const paths = adsIds.map(({ id }) => ({ params: { adId: String(id) } }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async () => {


    return { props: { } };
};
