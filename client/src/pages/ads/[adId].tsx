import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';


interface Props {
}

const AdPage: NextPage<Props> = () => {
    return (
        <>
            <Seo title="All ads" />
        </>
    );
};

export default AdPage;


export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [
            {
                params: {
                    adId: '6',
                },
            },
        ],
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<Props> = async () => {


    return { props: { } };
};
