import type * as Swagger from '@in-good-hands/share/swagger';
import type { GetServerSideProps, NextPage } from 'next';

import Ad from '~/components/features/Ad';
import Seo from '~/components/helpers/Seo';
import { api } from '~/utils';


interface Props {
    ad: Swagger.Ad.FindOne.ResponseBody
}

const AdPage: NextPage<Props> = ({ ad }) => {
    return (
        <>
            <Seo description={ad.description} keywords={[ad.breed, ad.name, ad.type]} title={ad.breed} />
            <Ad {...ad} />
        </>
    );
};

export default AdPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    if (!params || typeof params.adId !== 'string') return { notFound: true };
    const { data: ad } = await api(req).ad.findOne({ adId: Number(params.adId) });

    return { props: { ad } };
};
