import { Spinner } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';


const TimeoutPage: NextPage = () => {
    return (
        <>
            <Seo title="Loading" />
            <Spinner />
        </>
    );
};


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        redirect: {
            permanent: true,
            destination: typeof query.url === 'string' ? query.url : '/',
        },
    };
};

export default TimeoutPage;
