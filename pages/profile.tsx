import type { GetServerSideProps, NextPage } from 'next';

import Seo from '~/components/Seo';
import Profile from '~/layouts/Profile';


interface Props {
}

const ProfilePage: NextPage<Props> = () => {
    return (
        <>
            <Seo title="ProfilePage" />
            <Profile />
        </>
    );
};

export default ProfilePage;


export const getServerSideProps: GetServerSideProps<Props> = async () => {

    return { props: { } };
};
