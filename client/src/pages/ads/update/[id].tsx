import { Ad } from '@in-good-hands/server/src/swagger';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import Seo from '~/components/Seo';
import UpdateAd from '~/layouts/UpdateAd';
import { api, getUserCookie } from '~/utils';


interface Props {
    ad: Ad.UpdateData.ResponseBody
}


const UpdateAdPage: NextPage<Props> = ({ ad }) => {
    const { query } = useRouter();

    return (
        <>
            <Seo title="Create new ad" />
            <UpdateAd ad={ad} key={query.id as string} />
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


        if (ad.email.length === 0) ad.email = user.email;

        return { props: { ad } };
    } catch (error) {
        return { notFound: true };
    }
};
