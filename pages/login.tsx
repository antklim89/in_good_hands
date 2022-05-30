import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';


const LoginPage: NextPage = () => {
    return (
        <>
            <Seo title="Login" />
            <h1>LOGIN</h1>
        </>
    );
};

export default LoginPage;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
