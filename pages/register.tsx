import type { GetStaticProps, NextPage } from 'next';

import Seo from '~/components/Seo';


const RegisterPage: NextPage = () => {
    return (
        <>
            <Seo title="Register" />
            <h1>REGISTER</h1>
        </>
    );
};

export default RegisterPage;


export const getStaticProps: GetStaticProps = async () => {

    return { props: { } };
};
