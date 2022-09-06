import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { Ad } from '@in-good-hands/server/src/swagger';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { FC } from 'react';

import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const Ad: FC<Ad.FindOne.ResponseBody> = ({
    name, breed, type, description, birthday, images, price, tel, email, telegram, whatsapp,
}) => {
    return (
        <Container as="section" my={8}>
            <Flex flexDir={['column-reverse', null, 'row']} mb={4}>
                <Box flex="1 1 0">
                    <Text>Type: <Text as="span" textTransform="capitalize">{type}</Text></Text>
                    <Text>Breed: <Text as="span" textTransform="capitalize">{breed}</Text></Text>
                    {name.length > 0 && <Text>Name: <Text as="span" textTransform="capitalize">{name}</Text></Text>}
                    <Text>Birthday: <PetAge birthday={birthday} /></Text>
                    <Text>Telephone: <Text as="a" color="blue" href={`tel:${tel}`}>{tel}</Text></Text>
                    <Text>E-mail: <Text as="a" color="blue" href={`email:${email}`}>{email}</Text></Text>
                    {telegram ? <Text>Telegram: <Text as="a" color="blue" href={`https://telegram.me/share/url?url=${telegram}`}>{telegram}</Text></Text> : null}
                    {whatsapp ? <Text>WhatsUp: <Text as="a" color="blue" href={`https://api.whatsapp.com/send?phone=${whatsapp}`}>{whatsapp}</Text></Text> : null}
                    <Price fontSize="4xl" fontWeight="bold" price={price} />
                </Box>

                <Box flex="1 1 0">
                    {images.length > 0
                        ? (
                            <Carousel>
                                {images.map((image) => (
                                    <Image
                                        alt={`${type} ${breed}`}
                                        blurDataURL={image.thumbnail}
                                        height={720}
                                        key={image.id}
                                        objectFit="contain"
                                        placeholder="blur"
                                        src={getApiURL(image.src)}
                                        width={1280}
                                    />
                                ))}
                            </Carousel>
                        )
                        : (
                            <Box>
                                No Image
                            </Box>
                        )}
                </Box>
            </Flex>
            <Text bgColor="gray.100" borderRadius={8} p={4}>
                {description}
            </Text>
        </Container>
    );
};

export default Ad;
