import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';


const Home: NextPage = () => {
    return (
        <>
            <Seo title="Home" />
            <h1>HELLO</h1>
        </>
    );
};

export default Home;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
