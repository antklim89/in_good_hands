import {
    Box, Container, Flex, Heading, Text, useColorModeValue, 
} from '@chakra-ui/react';
import { FC } from 'react';

import heroImage from './Hero.image.jpg';

import Image from '~/components/ui/Image';


const Hero: FC = () => {
    const bgColor = useColorModeValue('white', 'gray.800');

    return (
        <Container display="flex">
            <Flex
                alignItems="center" flex="1 1 0" position="relative"
                zIndex={100}
            >
                <Box
                    bg={bgColor}
                    boxShadow="2px 2px 5px black"
                    left={8}
                    p={4}
                    position="absolute"
                    right={-8}
                >
                    <Heading color="secondary.500" fontSize="2xl" textTransform="uppercase" >Give your pet a chance <br />to find a loving home!</Heading>
                    <Text fontSize="xl">
                        This is a convenient platform for placing ads for the sale of
                        pets or find a fitting pet.
                    </Text>
                </Box>
            </Flex>
            <Box flex="1 1 0">
                <Image alt="hero" src={heroImage} />
            </Box>

        </Container>
    );
};

export default Hero;

