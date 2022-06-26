import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import EditAd from '~/layouts/EditAd';
import { IAdEdit } from '~/types';
import { requestAd } from '~/utils';


interface Props {
    ad: IAdEdit
}


const EditAdPage: NextPage<Props> = ({ ad }) => {

    return (
        <>
            <Seo title="Create new ad" />
            <EditAd initialValues={ad} />
        </>
    );
};

export default EditAdPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    if (!params || !(typeof params.id === 'string')) return { notFound: true };
    const ad = await requestAd(params.id);


    return { props: { ad } };
};
