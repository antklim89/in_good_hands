import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Container,
} from '@chakra-ui/react';
import { FC } from 'react';


import { ProfileProps } from './Profile.types';
import ProfileCredentials from './ProfileCredentials';

import MyAdsList from '~/layouts/MyAdsList';


const Profile: FC<ProfileProps> = () => {
    return (
        <Container maxWidth="container.lg" my={8} shadow="lg">
            <Tabs>
                <TabList>
                    <Tab>Credentials</Tab>
                    <Tab>Ads</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <ProfileCredentials />
                    </TabPanel>
                    <TabPanel>
                        <MyAdsList />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Profile;

