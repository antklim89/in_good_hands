import { Box, Button, Container, Flex, Text } from '@chakra-ui/react';
import { Ad } from '@in-good-hands/server/src/swagger';
import Image from 'next/image';
import Carousel from 'nuka-carousel';
import { FC } from 'react';
import { FaTelegramPlane, FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

import FavoriteButton from '~/components/FavoriteButton';
import PetAge from '~/components/PetAge';
import Price from '~/components/Price';
import { getApiURL } from '~/utils';


const Ad: FC<Ad.FindOne.ResponseBody> = ({
    id, name, breed, type, description, birthday, images, price, tel, email, telegram, whatsapp, inFavorites,
}) => {
    return (
        <Container as="section" my={8}>
            <Flex justifyContent="flex-end" my={4}>
                <FavoriteButton adId={id} inFavorites={inFavorites} mx={4} />
            </Flex>
            <Flex flexDir={['column-reverse', null, 'row']} mb={4}>
                <Box
                    alignItems="flex-start" display="flex" flex="1 1 0"
                    flexDirection="column"
                >
                    <Text>Type: <Text as="span" textTransform="capitalize">{type}</Text></Text>
                    <Text>Breed: <Text as="span" textTransform="capitalize">{breed}</Text></Text>
                    {name.length > 0 && <Text>Name: <Text as="span" textTransform="capitalize">{name}</Text></Text>}
                    <Text>Birthday: <PetAge birthday={birthday} /></Text>

                    <Button
                        as="a"
                        href={`email:${email}`}
                        mb={4}
                    >
                        <FaEnvelope />&emsp;{email}
                    </Button>

                    <Button
                        as="a"
                        href={`tel:${tel}`}
                        mb={4}
                    >
                        <FaPhoneAlt />&emsp;{tel}
                    </Button>

                    {telegram
                        ? (
                            <Button
                                as="a"
                                href={`https://telegram.me/share/url?url=${telegram}`}
                                mb={4}
                            >
                                <FaTelegramPlane />&emsp;{telegram}
                            </Button>
                        )
                        : null}

                    {whatsapp
                        ? (
                            <Button
                                as="a"
                                href={`https://api.whatsapp.com/send?phone=${whatsapp}`}
                                mb={4}
                            >
                                <FaWhatsapp />&emsp;{whatsapp}
                            </Button>
                        )
                        : null}
                    <Price
                        color="primary.50"
                        fontSize="6xl"
                        fontWeight="bold"
                        price={price}
                    />
                </Box>

                <Box flex="1 1 0">
                    {images.length > 0
                        ? (
                            <Carousel
                                defaultControlsConfig={{ nextButtonText: '>', prevButtonText: '<' }}
                                renderBottomCenterControls={null}
                            >
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
                            <Image
                                alt={`${type} placeholder`}
                                height={720}
                                objectFit="contain"
                                src={`/placeholders/${type}-ph.jpg`}
                                width={1280}
                            />
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
