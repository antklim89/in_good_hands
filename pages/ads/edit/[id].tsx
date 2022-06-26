import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import { IAdUpdateDataQuery } from '~/generated/graphql';
import EditAd from '~/layouts/EditAd';
import { requestAdUpdateData } from '~/utils';


interface Props {
    ad: IAdUpdateDataQuery['ad']['data']
}


const EditAdPage: NextPage<Props> = ({ ad: { id, attributes } }) => {
    const {
        images, birthday, body, breed, email, name, tel, price, type,
    } = attributes;
    return (
        <>
            <Seo title="Create new ad" />
            <EditAd
                id={id}
                images={images}
                initialValues={{
                    birthday, body, breed, email, name, tel, price, type,
                }}
            />
        </>
    );
};

export default EditAdPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
    if (!params || !(typeof params.id === 'string')) return { notFound: true };
    const ad = await requestAdUpdateData({ id: params.id });


    return { props: { ad } };
};
