import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useMyAdsList } from './MyAdsList.use';
import MyAdsListItem from './MyAdsListItem';


const MyAdsList: FC = () => {
    const { ads, hasNext, handleFetchMore } = useMyAdsList();

    return (
        <div>
            <Box>
                {ads.map((ad) => (
                    <MyAdsListItem {...ad} key={ad.id} />
                ))}
            </Box>

            {
                ads.length === 0
                    ? (
                        <Text my={4} textAlign="center">
                            You have not created  any ads yet.
                        </Text>
                    )
                    : null
            }
            {
                hasNext
                    ? (
                        <Flex justifyContent="center" mt={8}>
                            <Button variant="outline" onClick={handleFetchMore}>
                                Show More
                            </Button>
                        </Flex>
                    )
                    : null
            }
        </div>
    );
};

export default MyAdsList;
