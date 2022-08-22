import { Container, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import Markdown from '~/components/Markdown';

import heroImage from './Hero.image.png';


const Hero: FC = () => {
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Omnis eius et quidem, id in ipsam aperiam quia hic dolorum
                        assumenda placeat, itaque qui reprehenderit provident consectetur vel.
                        Fugit, accusamus esse.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat eveniet sint dignissimos earum sequi tempora fugit
                        asperiores quod exercitationem et. Veritatis.
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
                        src={heroImage}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;

