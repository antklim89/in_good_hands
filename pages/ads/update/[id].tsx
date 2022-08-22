import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import { Ad } from '~/fastify/src/swagger';
import UpdateAd from '~/layouts/UpdateAd';
import { api, getUserCookie } from '~/utils';


interface Props {
    ad: Ad.UpdateData.ResponseBody
}


const UpdateAdPage: NextPage<Props> = ({ ad }) => {
    return (
        <>
            <Seo title="Create new ad" />
            <UpdateAd
                id={ad.id}
                // images={images}
                initialValues={ad}
            />
        </>
    );
};

export default UpdateAdPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    try {
        const { user } = getUserCookie(req.headers.cookie) || { user: { email: '' } };

        if (!params || !(typeof params.id === 'string')) return { notFound: true };

        const { data: ad } = await api(req).ad.updateData({ adId: Number(params.id) });
        if (!ad) return { notFound: true };

        ad.email = ad.email.length === 0 ? user.email : ad.email;

        return { props: { ad } };
    } catch (error) {
        return { notFound: true };
    }
};
