import { Container, Box, Text, Heading } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import heroImage from './Hero.image.svg';


const Hero: FC = () => {
    return (
        <Box
            as="section"
            height={[100, 200, 300, 400, 500]}
            overflow="hidden"
            position="relative"
        >
            <Box
                height="100%"
                left="50%"
                position="absolute"
                transform="translateX(-50%)"
                width={2560}
                zIndex={-1}
            >
                <NextImage
                    alt="hero"
                    layout="fill"
                    src={heroImage.src}
                />
            </Box>

            <Container
                alignItems="center"
                display="flex"
                height="100%"
            >
                <Box width="50%">
                    <Heading as="h1" color="primary.600" fontSize="5xl">
                        <Text as="span" color="blue.600" textDecoration="underline">Kindness</Text> can change everything
                    </Heading>
                    <Text color="primary.600" fontSize="xl">
                        Turning dreams into reality.
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;

