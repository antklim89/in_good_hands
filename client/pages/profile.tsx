import type { NextPage } from 'next';

import Profile from '~/components/features/Profile';
import Protected from '~/components/helpers/Protected';
import Seo from '~/components/helpers/Seo';


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
