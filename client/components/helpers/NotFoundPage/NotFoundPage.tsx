import { Center, Text } from '@chakra-ui/react';

import Seo from '../Seo';


const NotFoundPage = () => {
    return (
        <Center height="100%">
            <Seo title="Page not found" />
            <Text fontSize="3xl">
                404 | This page could not be found.
            </Text>
        </Center>
    );
};

export default NotFoundPage;
