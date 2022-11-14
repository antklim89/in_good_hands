import type { NextPage } from 'next';

import NotFoundPage from './404';

import Protected from '~/components/Protected';
import Seo from '~/components/Seo';
import Auth from '~/layouts/Auth';


const LoginPage: NextPage = () => {
    return (
        <Protected protectIfAuth protectedComponent={<NotFoundPage />}>
            <Seo title="Login" />
            <Auth type="login" />
        </Protected>
    );
};

export default LoginPage;
