import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import { USER_STORAGE_NAME } from '~/constants';
import { IAdUpdateDataQuery } from '~/generated/graphql';
import UpdateAd from '~/layouts/UpdateAd';
import { requestAdUpdateData } from '~/utils';


interface Props {
    ad: IAdUpdateDataQuery['ads']['data'][0]
}


const UpdateAdPage: NextPage<Props> = ({ ad: { id, attributes } }) => {
    const {
        images, birthday, body, breed, email, name, tel, price, type, isPublished,
    } = attributes;


    return (
        <>
            <Seo title="Create new ad" />
            <UpdateAd
                id={id}
                images={images}
                initialValues={{
                    birthday,
                    body,
                    breed,
                    email,
                    name,
                    tel,
                    price,
                    type,
                    isPublished,
                }}
            />
        </>
    );
};

export default UpdateAdPage;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    try {
        const { id: ownerId, email } = JSON.parse(req.cookies[USER_STORAGE_NAME]);

        if (!params || !(typeof params.id === 'string')) return { notFound: true };

        const ad = await requestAdUpdateData({ id: params.id, ownerId });
        if (!ad) return { notFound: true };

        ad.attributes.email = ad.attributes.email.length === 0 ? (email || '') : ad.attributes.email;

        return { props: { ad } };
    } catch (error) {
        return { notFound: true };
    }
};
