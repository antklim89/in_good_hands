import type * as Swagger from '@in-good-hands/server/src/swagger';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Ad from '~/layouts/Ad';
import { api } from '~/utils';


interface Props {
    ad: Swagger.Ad.FindOne.ResponseBody
}

const AdPage: NextPage<Props> = ({ ad }) => {
    return (
        <>
            <Seo title={ad.breed} />
            <Ad {...ad} />
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    if (!params || typeof params.adId !== 'string') return { notFound: true };
    const { data: ad } = await api().ad.findOne({ adId: Number(params.adId) });

    return { props: { ad } };
};
