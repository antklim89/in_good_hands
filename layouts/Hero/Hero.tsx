import { Text, Image, Box } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';

import { HeroProps } from './Hero.types';


const Hero: FC<HeroProps> = ({ body, image }) => {
    return (
        <section>
            <Text>
                {body}
            </Text>
            <Box>
                <Image alt="hero" as={NextImage} src={image} />
            </Box>
        </section>
    );
};

export default Hero;

