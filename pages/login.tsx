import type { GetStaticProps, NextPage } from 'next';

import Protected from '~/components/Protected';
import Seo from '~/components/Seo';
import Auth from '~/layouts/Auth';

import NotFoundPage from './404';


const LoginPage: NextPage = () => {
    return (
        <Protected protectIfAuth protectedComponent={<NotFoundPage />}>
            <Seo title="Login" />
            <Auth type="login" />
        </Protected>
    );
};

export default LoginPage;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
