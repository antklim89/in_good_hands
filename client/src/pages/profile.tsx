import type { NextPage } from 'next';

import NotFoundPage from './404';

import Protected from '~/components/Protected';
import Seo from '~/components/Seo';
import Profile from '~/layouts/Profile';


const ProfilePage: NextPage = () => {
    return (
        <>
            <Seo title="Profile" />
            <Protected protectedComponent={<NotFoundPage />} >
                <Profile />
            </Protected>
        </>
    );
};

export default ProfilePage;
