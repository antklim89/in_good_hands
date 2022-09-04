import { Container, Box, Text, Heading } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import heroImage from './Hero.image.jpg';


const Hero: FC = () => {
    return (
        <Box as="section" position="relative">
            <Box bg="hsla(34, 100%, 15%, 0.5)" >
                <Container
                    maxWidth="container.xl"
                    minHeight={320}
                >
                    <Heading as="h1" color="white" py={8} >
                        Welcome
                    </Heading>
                    <Text color="white" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Omnis eius et quidem, id in ipsam aperiam quia hic dolorum
                        assumenda placeat, itaque qui reprehenderit provident consectetur vel.
                        Fugit, accusamus esse.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellat eveniet sint dignissimos earum sequi tempora fugit
                        asperiores quod exercitationem et. Veritatis.
                    </Text>
                </Container>
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
        </Box>
    );
};

export default Hero;

