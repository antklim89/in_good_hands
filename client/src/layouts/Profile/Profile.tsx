import {
    Tabs, TabList, Tab, TabPanels, TabPanel, Container,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

import MyAdsList from '~/layouts/MyAdsList';
import MyFavorites from '~/layouts/MyFavorites';
import UpdateCredentials from '~/layouts/UpdateCredentials';


const Profile: FC = () => {
    const { replace, query } = useRouter();

    return (
        <Container maxWidth="container.lg" my={8} shadow="lg">
            <Tabs
                isFitted
                isLazy
                defaultIndex={Number(query.tab || 0)}
                onChange={(index) => replace(`?tab=${index}`)}
            >
                <TabList>
                    <Tab>Credentials</Tab>
                    <Tab>Ads</Tab>
                    <Tab>Favorites</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel px={0}>
                        <UpdateCredentials />
                    </TabPanel>
                    <TabPanel px={0}>
                        <MyAdsList />
                    </TabPanel>
                    <TabPanel px={0}>
                        <MyFavorites />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
};

export default Profile;

