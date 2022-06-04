import { Text, Container, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import { IHero } from '~/types';
import { getStrapiUrl } from '~/utils/getStrapiUrl';


const Hero: FC<IHero> = ({ body, image }) => {
    return (
        <Box as="section" position="relative">
            <Container
                alignItems="center"
                display="flex"
                maxWidth="container.xl"
                minHeight={320}
            >
                <Text
                    backdropBlur="base"
                    bg="rgba(255,255,255,0.5)"
                    px={2}
                    py={4}
                    width="50%"
                >
                    {body}
                </Text>
                <Box
                    bottom={0}
                    left={0}
                    objectFit="cover"
                    position="absolute"
                    right={0}
                    top={0}
                    zIndex={-1}
                >
                    <NextImage
                        alt="hero"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        src={getStrapiUrl(image)}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;

