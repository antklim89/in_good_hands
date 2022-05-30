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
    const hero = await fetch(`${process.env.STRAPI_API || 'http://localhost:1337'}/api/hero`).then((r) => r.json());

    return { props: { } };
};
