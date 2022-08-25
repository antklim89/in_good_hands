import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Container,
} from '@chakra-ui/react';
import { FC } from 'react';

import { ProfileProps } from './Profile.types';
import ProfileCredentials from './ProfileCredentials';


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
                        Ads
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Profile;

