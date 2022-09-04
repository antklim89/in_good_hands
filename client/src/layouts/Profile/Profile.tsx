import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Container,
} from '@chakra-ui/react';
import { FC } from 'react';

import MyAdsList from '~/layouts/MyAdsList';
import UpdateCredentials from '~/layouts/UpdateCredentials';


const Profile: FC = () => {
    return (
        <Container maxWidth="container.lg" my={8} shadow="lg">
            <Tabs>
                <TabList>
                    <Tab>Credentials</Tab>
                    <Tab>Ads</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UpdateCredentials />
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

