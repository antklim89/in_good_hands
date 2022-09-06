import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Container,
} from '@chakra-ui/react';
import { FC } from 'react';

import MyAdsList from '~/layouts/MyAdsList';
import MyFavorites from '~/layouts/MyFavorites';
import UpdateCredentials from '~/layouts/UpdateCredentials';


const Profile: FC = () => {
    return (
        <Container maxWidth="container.lg" my={8} shadow="lg">
            <Tabs>
                <TabList>
                    <Tab>Credentials</Tab>
                    <Tab>Ads</Tab>
                    <Tab>Favorites</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <UpdateCredentials />
                    </TabPanel>
                    <TabPanel>
                        <MyAdsList />
                    </TabPanel>
                    <TabPanel>
                        <MyFavorites />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Profile;

