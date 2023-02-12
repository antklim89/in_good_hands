import type { NextPage } from 'next';

import Protected from '~/components/Protected';
import Seo from '~/components/Seo';
import Profile from '~/layouts/Profile';


const ProfilePage: NextPage = () => {
    return (
        <>
            <Seo title="Profile" />
            <Protected>
                <Profile />
            </Protected>
        </>
    );
};

export default ProfilePage;
