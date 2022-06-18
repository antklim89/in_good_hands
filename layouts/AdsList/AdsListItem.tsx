import { Flex, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { IAd } from '~/types';
import { getStrapiUrl } from '~/utils';


const AdsListItem: FC<IAd> = ({ type, breed, images }) => {
    return (
        <Flex
            as="section"
            border="1px solid lightgrey"
            borderRadius="md"
            boxShadow="xl"
            my={8}
            p={4}
            width="full"
        >
            <Box mr={8}>
                <Image
                    alt={`${type} ${breed}`}
                    height={270}
                    src={getStrapiUrl(images[0])}
                    width={400}
                />
            </Box>
            <Box>
                <Text>
                    {type}
                </Text>
                <Text>
                    {breed}
                </Text>
            </Box>
        </Flex>
    );
};

export default AdsListItem;
