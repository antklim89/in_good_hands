import type * as Swagger from '@in-good-hands/server/src/swagger';
import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import Ad from '~/layouts/Ad';
import { api, withTimeout } from '~/utils';


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

export const getServerSideProps = withTimeout<Props>(async ({ params, req }) => {
    if (!params || typeof params.adId !== 'string') return { notFound: true };
    const { data: ad } = await api(req).ad.findOne({ adId: Number(params.adId) });

    return { props: { ad } };
});
