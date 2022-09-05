import { Box, Container, HStack, Text } from '@chakra-ui/react';
import { Ad } from '@in-good-hands/server/src/swagger';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { FC } from 'react';

import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const Ad: FC<Ad.FindOne.ResponseBody> = ({
    name, breed, type, description, birthday, images, price, tel, email,
}) => {
    return (
        <Container as="section" my={8}>
            <HStack justifyContent="space-between" mb={4}>
                <Text fontSize="xl" lineHeight={2}>
                    Type: <Text as="span" textTransform="capitalize">{type}</Text>
                    <br />
                    Breed: <Text as="span" textTransform="capitalize">{breed}</Text>
                    <br />
                    Name: <Text as="span" textTransform="capitalize">{name}</Text>
                    <br />
                    Birthday: <PetAge birthday={birthday} />
                    <br />
                    Telephone: <Text as="a" color="blue" href={`tel:${tel}`}>{tel}</Text>
                    <br />
                    E-mail: <Text as="a" color="blue" href={`email:${email}`}>{email}</Text>
                    <br />
                    <Price fontSize="4xl" fontWeight="bold" price={price} />
                </Text>
                {images.length > 0
                    ? (
                        <Carousel >
                            {images.map((image) => (
                                <Image
                                    alt={`${type} ${breed}`}
                                    blurDataURL={image.thumbnail}
                                    height={270}
                                    key={image.id}
                                    placeholder="blur"
                                    src={getApiURL(image.src)}
                                    width={400}
                                />
                            ))}
                        </Carousel>
                    )
                    : (
                        <Box>
                            No Image
                        </Box>
                    )}
            </HStack>
            <Text>
                {description}
            </Text>
        </Container>
    );
};

export default Ad;
