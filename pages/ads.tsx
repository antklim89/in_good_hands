import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';


const AdsPage: NextPage = () => {
    return (
        <>
            <Seo title="All ads" />
            <h1>ADS</h1>
        </>
    );
};

export default AdsPage;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
