import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import Auth from '~/layouts/Auth';


const RegisterPage: NextPage = () => {
    return (
        <>
            <Seo title="Register" />
            <Auth type="register" />
        </>
    );
};

export default RegisterPage;
