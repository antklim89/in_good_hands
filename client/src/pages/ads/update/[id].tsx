import { Ad } from '@in-good-hands/share/swagger';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import UpdateAd from '~/components/features/UpdateAd';
import Seo from '~/components/helpers/Seo';
import { api } from '~/utils';


interface Props {
    ad: Ad.FindUpdateData.ResponseBody
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
        if (!params || !(typeof params.id === 'string')) return { notFound: true };

        const { data: ad } = await api(req).ad.findUpdateData({ adId: Number(params.id) });
        if (!ad) return { notFound: true };

        const { data: me } = await api(req).auth.me();
        if (ad.email.length === 0 && me.email) ad.email = me.email;
        if (ad.tel?.length === 0 && me.tel) ad.tel = me.tel;
        if (ad.whatsapp?.length === 0 && me.whatsapp) ad.whatsapp = me.whatsapp;
        if (ad.telegram?.length === 0 && me.telegram) ad.telegram = me.telegram;

        return { props: { ad } };
    } catch (error) {
        return { notFound: true };
    }
};
