import { Container, Box, Text, Heading } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import heroImage from './Hero.image.svg';


const Hero: FC = () => {
    return (
        <Box
            as="section"
            height={[150, 200, 300, 400, 500]}
            overflow="hidden"
            position="relative"
            zIndex={-1}
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
                    fill
                    alt="hero"
                    src={heroImage.src}
                />
            </Box>

            <Container
                alignItems="center"
                display="flex"
                height="100%"
            >
                <Box width="50%">
                    <Heading as="h1" color="primary.600" fontSize={['xl', '2xl', '5xl']}>
                        Turning <Text as="span" color="secondary.600" textDecoration="underline">dreams</Text> into reality.
                    </Heading>
                    <Text color="primary.600" fontSize={['md', 'lg', 'xl']}>
                        Website of ads for the sale of pets
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;

