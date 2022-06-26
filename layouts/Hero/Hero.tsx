import { Container, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import Markdown from '~/components/Markdown';
import { IHeroQuery } from '~/generated/graphql';
import { getStrapiUrl } from '~/utils/getStrapiUrl';


const Hero: FC<IHeroQuery['hero']['data']> = ({ attributes: { body, image } }) => {
    return (
        <Box as="section" position="relative">
            <Container
                alignItems="center"
                display="flex"
                maxWidth="container.xl"
                minHeight={320}
            >
                <Box
                    backdropBlur="base"
                    bg="rgba(255,255,255,0.5)"
                    my={6}
                    px={2}
                    py={4}
                    width="50%"
                >
                    <Markdown >
                        {body}
                    </Markdown>
                </Box>
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
                        src={getStrapiUrl(image.data.attributes.url)}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;

