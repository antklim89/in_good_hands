import { Flex, Button, Center, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

import Seo from '~/components/Seo';


const NotFoundPage: NextPage = () => {
    return (
        <Center height="100%">
            <Seo title="Page not found" />
            <Flex flexDirection="column">
                <Text fontSize="3xl">
                    404 | Unexpected Server Error.
                </Text>
                <Button onClick={() => location.reload()}>Reload Page</Button>
            </Flex>
        </Center>
    );
};

export default NotFoundPage;
