import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Auth from '~/layouts/Auth';


const LoginPage: NextPage = () => {
    return (
        <>
            <Seo title="Login" />
            <Auth type="login" />
        </>
    );
};

export default LoginPage;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
