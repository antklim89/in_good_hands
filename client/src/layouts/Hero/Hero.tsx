import { Container, Box, Text } from '@chakra-ui/react';
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

            <Container >
                <Text width="50%">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae magnam architecto dolores ex? Hic iste rerum dolorum omnis corporis voluptas!
                </Text>
            </Container>
        </Box>
    );
};

export default Hero;

